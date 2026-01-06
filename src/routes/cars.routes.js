import { Router } from "express";
import { carController } from "../controllers/cars.controller.js";
import { validationFactory } from "../middleware/validationFactory.js";
import { validation } from "../validations/validation.js";

export const carRouter = Router();

carRouter
  .get("/", carController.getAllCars)
  .post("/", validationFactory(validation.carSchema), carController.carCreate)
  .put(
    "/:id",
    validationFactory(validation.carUpdateSchema),
    carController.updateCar
  )
  .delete("/:id", carController.deleteCar);
