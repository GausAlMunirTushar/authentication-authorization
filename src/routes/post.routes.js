import { Router } from "express";
import { getAllPosts, createPost } from "../controllers/post.controller.js";
import authenticate from "../middlewares/authenticate.js";
import authorize from "../middlewares/authorize.js";

const router = Router();

// roles: ['user', 'admin']
router.get("/posts", authenticate, authorize(["user"]), getAllPosts);

// roles: ['', 'admin']
router.post("/posts", authenticate, authorize(["admin"]), createPost);

export { router as postRoutes };
