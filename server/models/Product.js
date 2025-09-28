import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    cod: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    category: {type: String, required: true},
    tecidos: {type: Array, required: true},
    priceCents: {type: Object, required: true},
    image: {type: Array, default: []},
    description: {type: Array, default: []},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    newRelease: {type: Boolean, default: false},
}, {timestamps: true})

const Product = mongoose.models.product || mongoose.model('product', productSchema)

export default Product;