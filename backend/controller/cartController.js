// Import the Cart Item model from the cartItemModel.js file
import cartItemModel from "../model/cartItemModel.js";

// Function to add an item to the cart
const addToCart = async (req, res) => {
    try {
         // Destructure userId, productId, and quantity from the request body
        const { userId, productId, quantity } = req.body;
        
        // Check if the item already exists in the cart
        let existingCartItem = await cartItemModel.findOne({ userId, productId });

        if (existingCartItem) {
            // Update quantity if the item exists
            existingCartItem.quantity += quantity;
            await existingCartItem.save(); // Save the updated quantity
        } else {
            // Create a new cart item if it doesn't exist
            const newCartItem = new cartItemModel({ userId, productId, quantity });
            await newCartItem.save(); // Save the new cart item
        }
        // Send a success response after adding/updating the cart
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        // Handle errors during the process and send a failure response
        console.log(error);
        res.json({ success: false, message: "Failed to Add To Cart" });
    }
};

// Function to remove an item or reduce its quantity in the cart
const removeFromCart = async (req, res) => {
    try {
        // Destructure userId and productId from the request body
        const { userId, productId } = req.body;

        // Find the cart item for the given userId and productId
        let cartItem = await cartItemModel.findOne({ userId, productId });

        if (cartItem) {
            // If the item quantity is greater than 1, reduce the quantity
            if (cartItem.quantity > 1) {
                // Decrease quantity if more than 1
                cartItem.quantity -= 1;
                await cartItem.save(); // Save the updated cart item
            } else {
                // Remove the item from the cart if quantity is 1
                await cartItemModel.findByIdAndDelete(cartItem._id);
            }
            // Send a success response after removing/reducing the item
            res.json({ success: true, message: "Removed From Cart" });
        } else {
            // Send a failure response if the item is not found in the cart
            res.json({ success: false, message: "Item not found in cart" });
        }
    } catch (error) {
        // Handle errors during the process and send a failure response
        console.log(error);
        res.json({ success: false, message: "Failed to Remove From Cart" });
    }
};

// Function to fetch all cart items for a specific user
const getCart = async (req, res) => {
    try {
        // Destructure userId from the request body
        const { userId } = req.body;

        // Find all cart items associated with the userId
        // Populate productId to get full product details
        const cartItems = await cartItemModel.find({ userId }).populate('productId').exec();
        // Send the cart items in the response
        res.json({ success: true, cartItems });
    } catch (error) {
        // Handle errors during the process and send a failure response
        console.log(error);
        res.json({ success: false, message: "Error while fetching cart data" });
    }
};

// Function to clear all items from the user's cart
const clearCart = async (req, res) => {
    try {
         // Destructure userId from the request body
        const { userId } = req.body;

        // Delete all cart items for the given userId
        await cartItemModel.deleteMany({ userId });

        // Send a success response after clearing the cart
        res.json({ success: true, message: "Cart cleared successfully" });
    } catch (error) {
        // Handle errors during the process and send a failure response
        console.log(error);
        res.json({ success: false, message: "Failed to clear cart" });
    }
};
// Export the functions to be used in other parts of the app
export { addToCart, removeFromCart, getCart, clearCart };