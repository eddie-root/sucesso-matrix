import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";

// Add Product
export const addProduct = async (req, res) => {
    try {
        const productData = JSON.parse(req.body.productData);
        const images = req.files;

        if (!images || images.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: "At least one image is required" 
            });
        }

        // Upload images to cloudinary
        const imageUrls = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, {
                    resource_type: "image"
                });
                return result.secure_url;
            })
        );

        // Create product with image URLs
        const product = await Product.create({
            ...productData,
            image: imageUrls
        });

        res.status(201).json({ 
            success: true, 
            message: "Product added successfully",
            product 
        });

    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ 
            success: false, 
            message: error.message || "Error adding product" 
        });
    }
};

// Get All Products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json({ 
            success: true, 
            products 
        });
    } catch (error) {
        console.error("Error getting products:", error);
        res.status(500).json({ 
            success: false, 
            message: error.message || "Error getting products" 
        });
    }
};

// Get Product By Id
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: "Product not found" 
            });
        }

        res.json({ 
            success: true, 
            product 
        });
    } catch (error) {
        console.error("Error getting product:", error);
        res.status(500).json({ 
            success: false, 
            message: error.message || "Error getting product" 
        });
    }
};

// Update Product
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        // If there are new images, upload them
        if (req.files && req.files.length > 0) {
            const imageUrls = await Promise.all(
                req.files.map(async (item) => {
                    const result = await cloudinary.uploader.upload(item.path, {
                        resource_type: "image"
                    });
                    return result.secure_url;
                })
            );
            updateData.image = imageUrls;
        }

        const product = await Product.findByIdAndUpdate(
            id,
            { ...updateData, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: "Product not found" 
            });
        }

        res.json({ 
            success: true, 
            message: "Product updated successfully",
            product 
        });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ 
            success: false, 
            message: error.message || "Error updating product" 
        });
    }
};

// Delete Product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: "Product not found" 
            });
        }

        // Delete images from cloudinary
        if (product.image && product.image.length > 0) {
            await Promise.all(
                product.image.map(async (imageUrl) => {
                    const publicId = imageUrl.split('/').pop().split('.')[0];
                    await cloudinary.uploader.destroy(publicId);
                })
            );
        }

        res.json({ 
            success: true, 
            message: "Product deleted successfully" 
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ 
            success: false, 
            message: error.message || "Error deleting product" 
        });
    }
};

