import mongoose from "mongoose";

const priceGroupShema = new mongoose.Schema({
    name: { type: String, required: true },
    prices: { type: Object, required: true },
}, { _id: false });

const productSchema = new mongoose.Schema({
    cod: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    category: {type: String, required: true},
    image: {type: Array, default: []},
    description: {type: Array, default: []},
    priceGroups: {type: [priceGroupShema], required: true}, // <-- Changed field
    newRelease: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
}, {timestamps: true})

const Product = mongoose.models.product || mongoose.model('product', productSchema)

export default Product;