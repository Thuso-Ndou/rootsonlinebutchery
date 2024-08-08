import userModel from "../model/userModel.js";

// add item to cart
const addToCart = async(req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }

        // update cart with new data
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true,message:"Added To Cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Failed to Add To Cart"});
    }
}

// remove item from cart
const removeFromCart = async(req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }

        // update new cart data
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true,message:"Removed From Cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Failed to Remove From Cart"});
    }
}

// fetch user cart item data
const getCart = async(req,res) => {

}

export { addToCart, removeFromCart, getCart}