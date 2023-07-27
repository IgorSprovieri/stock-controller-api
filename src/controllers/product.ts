import { Request, Response } from "express";
import { number, object, string } from "yup";
import { dataBase } from "../db";
import { Product } from "../entities/product";

export class ProductController {
  async post(req: Request, res: Response) {
    try {
      const { body } = req;

      const schema = object({
        name: string().required(),
        quantity: number().required(),
      });

      await schema.validate(body);

      const { name, user, quantity } = body;

      const exists = await dataBase
        .getRepository(Product)
        .findOneBy({ name: name });

      if (exists) {
        throw new Error("Product already exists");
      }

      const product = new Product({
        name: name,
        user: user,
        quantity: quantity,
      });

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
        return res.status(404).json({ error: "Product not found" });
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

  async delete(req: Request, res: Response) {
    try {
      const { params } = req;

      const { id } = params;

      const product = await dataBase
        .getRepository(Product)
        .findOneBy({ id: id });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const productDeleted = await dataBase
        .getRepository(Product)
        .delete(product);

      if (!productDeleted) {
        throw new Error("Product not deleted");
      }

      return res.status(200).json({ sucess: true });
    } catch (error: Error | unknown) {
      return res.status(400).json({
        error: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }
}
