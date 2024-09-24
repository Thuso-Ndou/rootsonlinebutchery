import orderModel from "../model/orderModel.js";
import orderItemModel from "../model/orderItemModel.js";
import paymentModel from "../model/paymentModel.js";
import cartItemModel from "../model/cartItemModel.js";
import {createAddress} from "./addressController.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";

    try {
        const { firstName, lastName, street, suburb, city, zipCode, province, email, phone } = req.body.address;
        const userID = req.body.userId;

        // Create address
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

        if (!addressResult.success) {
            return res.status(400).json({ success: false, message: addressResult.message });
        }

        const { items } = req.body;

        if (!items || !Array.isArray(items)) {
            return res.status(400).json({ success: false, message: "Items are required and should be an array." });
        }
        
        // Proceed with your order processing
        const orderItems = await Promise.all(
            items.map(async (item) => {
                const orderItem = new orderItemModel({ product: item.productId, quantity: item.quantity });
                return await orderItem.save();
            })
        );

        // Create the order
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: orderItems.map(item => item._id),
            amount: req.body.amount,
            address: addressResult.address._id
        });

        // Save the order in the database
        await newOrder.save();

        // Clear user cart
        await cartItemModel.deleteMany({ userId: req.body.userId });

        // Define line_items here
        const line_items = items.map((item) => {
            const price = item.price && typeof item.price === 'number' ? item.price * 100 : 0;
            const quantity = item.quantity && typeof item.quantity === 'number' ? item.quantity : 1;

            if (price <= 0) {
                throw new Error(`Invalid price for item: ${item.productId}`);
            }

            return {
                price_data: {
                    currency: "zar",
                    product_data: {
                        name: item.name, // Use the correct property
                    },
                    unit_amount: price,
                },
                quantity,
            };
        });

        line_items.push({
            price_data: {
                currency: "zar",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 20 * 100,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}&amount=${newOrder.amount}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}&amount=${newOrder.amount}`,
        })

        res.json({success: true,session_url: session.url})

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "An error occurred while processing the order" });
    }
}

const verifyOrder = async (req, res) => {
    const {orderId,success,amount} = req.body;
    console.log(`Order ${orderId} amount ${amount} was successfully verified in ${success}`);
    try {
        if(success=="true"){
            // Create a new payment document
            const newPayment = new paymentModel({
            price: amount, // Use the amount from the request
            payment: true, // Use the payment
            cart_id: orderId, // Reference to the order
            });
            await newPayment.save();

            // Update the order to reference the payment
            await orderModel.findByIdAndUpdate(orderId, { payment: newPayment._id});

            res.json({success:true,message:"Payment successful"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Payment failed"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"An error occurred while processing the order"});
    }
};

// user orders frontend linkup
const userOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({userID:req.body.userID});
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error retrieving orders"});
    }
}

// find all orders for customers and them on the admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error retrieving orders"});
    }
}

// api for updating status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status: req.body.status});
        res.json({success:true,message:"Status updated"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error updating"});
        
    }
}

export {placeOrder, verifyOrder, userOrders, listOrders,updateStatus};