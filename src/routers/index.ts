import express, { Request, Response } from "express";
import { productController, userController } from "../controllers";
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

export { router };
