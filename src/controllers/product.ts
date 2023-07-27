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

      return res.status(201).json(productCreated);
    } catch (error: Error | unknown) {
      return res.status(400).json({
        error: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const { query } = req;
      const { user } = req.body;

      const products = await dataBase
        .getRepository(Product)
        .find({ where: { ...query, user: user } });

      return res.status(200).json(products);
    } catch (error: Error | unknown) {
      return res.status(400).json({
        error: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }

  async put(req: Request, res: Response) {
    try {
      const { params } = req;
      const { body } = req;

      const schema = object({
        name: string().required(),
      });

      await schema.validate(body);

      const { name } = body;
      const { id } = params;

      const exists = await dataBase
        .getRepository(Product)
        .findOneBy({ name: name });

      if (exists) {
        throw new Error("Product name already exists");
      }

      const product = await dataBase
        .getRepository(Product)
        .findOneBy({ id: id });

      if (!product) {
        return new Error("Product not found");
      }

      product.name = name;

      const productUpdated = await dataBase
        .getRepository(Product)
        .save(product);

      if (!productUpdated) {
        throw new Error("Product not updated");
      }

      return res.status(200).json(productUpdated);
    } catch (error: Error | unknown) {
      return res.status(400).json({
        error: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }
}
