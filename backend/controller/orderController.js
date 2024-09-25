import orderModel from "../model/orderModel.js";
import orderItemModel from "../model/orderItemModel.js";
import paymentModel from "../model/paymentModel.js";
import cartItemModel from "../model/cartItemModel.js";
import {createAddress} from "./addressController.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Function to handle placing an order
const placeOrder = async (req, res) => {
    // Frontend URL for redirection after payment
    const frontend_url = "http://localhost:5173";

    try {
        const { firstName, lastName, street, suburb, city, zipCode, province, email, phone } = req.body.address;
        const userID = req.body.userId;

        // Create the address for the order
        const addressResult = await createAddress({
            userID,
            firstName,
            lastName,
            street,
            suburb,
            city,
            zipCode,
            province,
            email,
            phone,
        });

        // Handle failure in address creation
        if (!addressResult.success) {
            return res.status(400).json({ success: false, message: addressResult.message });
        }

        const { items } = req.body;

        // Ensure there are items to process and that it's an array
        if (!items || !Array.isArray(items)) {
            return res.status(400).json({ success: false, message: "Items are required and should be an array." });
        }
        
        // Create order items for each product in the cart
        const orderItems = await Promise.all(
            items.map(async (item) => {
                const orderItem = new orderItemModel({ product: item.productId, quantity: item.quantity });
                return await orderItem.save();
            })
        );

        // Create a new order with user, items, amount, and address information
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: orderItems.map(item => item._id),
            amount: req.body.amount,
            address: addressResult.address._id
        });

        // Save the order to the database
        await newOrder.save();

        // Clear the user's cart after placing the order
        await cartItemModel.deleteMany({ userId: req.body.userId });

        // Define Stripe line items for payment
        const line_items = items.map((item) => {
            const price = item.price && typeof item.price === 'number' ? item.price * 100 : 0;
            const quantity = item.quantity && typeof item.quantity === 'number' ? item.quantity : 1;

            if (price <= 0) {
                throw new Error(`Invalid price for item: ${item.productId}`);
            }

            return {
                price_data: {
                    currency: "zar", // Set currency for payment
                    product_data: {
                        name: item.name, // Use product name for payment description
                    },
                    unit_amount: price,
                },
                quantity,
            };
        });

        // Add delivery charges to the order
        line_items.push({
            price_data: {
                currency: "zar",
                product_data: {
                    name: "Delivery Charges", // Flat delivery charge of 20 ZAR
                },
                unit_amount: 20 * 100,
            },
            quantity: 1,
        });

        // Create a Stripe session for checkout
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment', // Mode set to payment for Stripe checkout
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}&amount=${newOrder.amount}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}&amount=${newOrder.amount}`,
        })

        // Return session URL for redirecting to Stripe checkout
        res.json({success: true,session_url: session.url})

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "An error occurred while processing the order" });
    }
}

// Function to verify the order after payment
const verifyOrder = async (req, res) => {
    const {orderId,success,amount} = req.body;
    console.log(`Order ${orderId} amount ${amount} was successfully verified in ${success}`);
    try {
        // Create a new payment record upon successful verification
        if(success=="true"){
            // Create a new payment document
            const newPayment = new paymentModel({
            price: amount, // Use the amount from the request
            payment: true, // Use the payment
            cart_id: orderId, // Reference the order for which payment was made
            });
            await newPayment.save();

             // Update the order to link to the payment
            await orderModel.findByIdAndUpdate(orderId, { payment: newPayment._id});

            res.json({success:true,message:"Payment successful"})
        }
        else{
            // If payment failed, delete the order
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Payment failed"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"An error occurred while processing the order"});
    }
};

// Function to fetch user orders and link them to frontend
const userOrders = async (req, res) => {
    try {
        // Fetch orders for the specific user and populate the items and product details
        const orders = await orderModel.find({ userId: req.body.userId })
            .populate({
                path: 'items', // Populate the 'items' field
                populate: {
                    path: 'product', // Populate the 'product' field inside each item
                    model: 'meat' // product model
                }
            })
            .populate('payment') // Populate the payment details
            .populate('address'); // Populate the address details

        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error retrieving orders" });
    }
}

// Function to list all orders for admin panel
const listOrders = async (req, res) => {
    try {
        // Fetch all orders and populate the references for items, product, and address
        const orders = await orderModel.find({})
            .populate({
                path: 'items',
                populate: {
                    path: 'product',
                    model: 'meat' // product model name
                }
            })
            .populate('address'); // Populate address details

        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error retrieving orders" });
    }
}

// Function to update the status of an order
const updateStatus = async (req, res) => {
    try {
        // Find the order by ID and update its status
        const updatedOrder = await orderModel.findByIdAndUpdate(
            req.body.orderId,
            { status: req.body.status },
            { new: true } // This option returns the modified document
        ).populate({
            path: 'items',
            populate: {
                path: 'product',
                model: 'meat' // Replace with your product model name
            }
        }).populate('address'); // Populate address details if needed

        if (!updatedOrder) {
            return res.json({ success: false, message: "Order not found" });
        }

        res.json({ success: true, message: "Status updated", data: updatedOrder });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating status" });
    }
};


export {placeOrder, verifyOrder, userOrders, listOrders,updateStatus};