import { Request, Response } from "express";
import { boolean, date as yupDate, number, object, string } from "yup";
import { dataBase } from "../db";
import { Product } from "../entities/product";
import { Movement } from "../entities/movement";

export class MovementController {
  async post(req: Request, res: Response) {
    try {
      const { body } = req;

      const schema = object({
        product_id: string().required(),
        date: yupDate().required(),
        quantity: number().integer().required(),
        leftover: boolean().required(),
      });

      await schema.validate(body);

      const { product_id, user, date, quantity, leftover } = body;

      const product = await dataBase
        .getRepository(Product)
        .findOneBy({ id: product_id });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      product.quantity = product.quantity + quantity;

      await dataBase.getRepository(Product).save(product);

      const movement = new Movement({
        date: date,
        quantity: quantity,
        leftover: leftover,
        user: user,
        product: product,
      });

      const movementCreated = await dataBase
        .getRepository(Movement)
        .save(movement);

      if (!movementCreated) {
        throw new Error("Movement not created");
      }

      return res.status(201).json(movementCreated);
    } catch (error: Error | unknown) {
      return res.status(400).json({
        error: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }
}
