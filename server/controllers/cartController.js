import User from "../models/userModel.js";


// Update User CartData : /api/cart/update
export const updateCart = async (req, res)=> {
    try {
        const { userId, cartItems } = req.body;
        await User.findByIdAndUpdate( userId, { cartItems })
        res.json({ sucess: true, message: 'Cart Updated' })

    } catch (error) {
        res.json({ sucess: false, message: error.message })
    }
}