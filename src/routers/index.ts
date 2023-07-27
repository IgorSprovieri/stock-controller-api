import express, { Request, Response } from "express";
import {
  movementController,
  productController,
  userController,
} from "../controllers";
import { authMiddleware } from "../middlewares";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ Api: "Success" });
});

router.post("/user", userController.post);
router.post("/login", userController.login);

// ----------------- Auth Routes ------------------
router.use(authMiddleware.validateJwt);

router.post("/product", productController.post);
router.get("/products", productController.get);
router.put("/product/:id", productController.put);
router.delete("/product/:id", productController.delete);

router.post("/movement", movementController.post);

export { router };
