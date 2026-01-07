import { Router } from "express";
import { userController } from "../controllers/users.controller.js";
import { validationFactory } from "../middleware/validationFactory.js";
import { validation } from "../validations/validation.js";

export const userRouter = Router();

userRouter
  .get("/", userController.getAllUsers)
  .post(
    "/register",
    validationFactory(validation.userSchema),
    userController.register
  )
  .delete("/:id", userController.deleteUser)
  .put(
    "/:id",
    validationFactory(validation.userUpdateSchema),
    userController.updateUser
  );
