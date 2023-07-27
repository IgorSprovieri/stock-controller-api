import { Request, Response } from "express";
import { object, string } from "yup";
import { dataBase } from "../db";
import { Product } from "../entities/product";

export class ProductController {
  async post(req: Request, res: Response) {
    try {
      const { body } = req;

      const schema = object({
        name: string().required(),
      });

      await schema.validate(body);

      const { name, user } = body;

      const exists = await dataBase
        .getRepository(Product)
        .findOneBy({ name: name });

      if (exists) {
        throw new Error("Product already exists");
      }

      const product = new Product({ name: name, user: user });

      const productCreated = await dataBase
        .getRepository(Product)
        .save(product);

      if (!productCreated) {
        throw new Error("Product not created");
      }

      return res.status(201).json(body);
    } catch (error: Error | unknown) {
      return res.status(400).json({
        error: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }
}
