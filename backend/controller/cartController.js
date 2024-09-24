import cartItemModel from "../model/cartItemModel.js";

const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        
        // Check if the item already exists in the cart
        let existingCartItem = await cartItemModel.findOne({ userId, productId });

        if (existingCartItem) {
            // Update quantity if the item exists
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
        } else {
            // Create a new cart item if it doesn't exist
            const newCartItem = new cartItemModel({ userId, productId, quantity });
            await newCartItem.save();
        }

        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to Add To Cart" });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        let cartItem = await cartItemModel.findOne({ userId, productId });

        if (cartItem) {
            if (cartItem.quantity > 1) {
                // Decrease quantity if more than 1
                cartItem.quantity -= 1;
                await cartItem.save();
            } else {
                // Remove the item from the cart if quantity is 1
                await cartItemModel.findByIdAndDelete(cartItem._id);
            }

            res.json({ success: true, message: "Removed From Cart" });
        } else {
            res.json({ success: false, message: "Item not found in cart" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to Remove From Cart" });
    }
};

const getCart = async (req, res) => {
    try {
        const { userId } = req.body;

        // Fetch all cart items for the user
        const cartItems = await cartItemModel.find({ userId }).populate('productId').exec();
        res.json({ success: true, cartItems });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error while fetching cart data" });
    }
};

const clearCart = async (req, res) => {
    try {
        const { userId } = req.body;

        // Delete all cart items for the user
        await cartItemModel.deleteMany({ userId });

        res.json({ success: true, message: "Cart cleared successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to clear cart" });
    }
};

export { addToCart, removeFromCart, getCart, clearCart };