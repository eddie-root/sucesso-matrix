import express from "express";
import { upload } from "../configs/multer.js";
// import { authSeller } from "../middlewares/authSeller.js";
import { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/add", upload.array(['images'], 5), addProduct);

productRouter.get("/list", getAllProducts);

productRouter.get("/getbyid/:id", getProductById);

productRouter.put("/update/:id", updateProduct);

productRouter.delete("/delete/:id", deleteProduct);

export default productRouter;