import express from "express";
import { getPosts, createPost, deletePost } from "../controllers/postController";
import { getProducts, createProduct, deleteProduct } from "../controllers/productController";
import { getOrders, createOrder, deleteOrder } from "../controllers/orderController";

const router = express.Router()

// post routes
router.get("/posts", getPosts);
router.post("/post", createPost);
router.delete("/post/:id", deletePost);

// product routes
router.get("/products", getProducts);
router.post("/product", createProduct);
router.delete("/product/:id", deleteProduct);

// order routes
router.get("/orders", getOrders);
router.post("/order", createOrder);
router.delete("/order/:id", deleteOrder);

export default router;