import { Router } from "express";
import orderController from "../controllers/orders.controller.js";
import { validationFactory } from "../middleware/validationFactory.js";
import { validation } from "../validations/validation.js";

export const orderRouter = Router();

orderRouter
  .post(
    "/",
    validationFactory(validation.orderSchema),
    orderController.createOrder
  )
  .get("/:id", orderController.getAllOrders)
  .put(
    "/:id",
    validationFactory(validation.orderUpdateSchema),
    orderController.updateOrder
  )
  .delete("/:id", orderController.deleteOrder);
