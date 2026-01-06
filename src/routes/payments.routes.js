import { Router } from "express";
import paymentController from "../controllers/payments.controller.js";
import { validationFactory } from "../middleware/validationFactory.js";
import { validation } from "../validations/validation.js";

export const paymentRouter = Router();

paymentRouter
  .post(
    "/",
    validationFactory(validation.paymentSchema),
    paymentController.createPayment
  )
  .get("/:id", paymentController.getAllPayments)
  .put(
    "/:id",
    validationFactory(validation.paymentUpdateSchema),
    paymentController.updatePayment
  )
  .delete("/:id", paymentController.deletePayment);
