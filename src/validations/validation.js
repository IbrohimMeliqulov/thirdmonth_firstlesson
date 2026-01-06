import Joi from "joi";

class Validation {
  constructor() {}

  userSchema = Joi.object({
    full_name: Joi.string().required().alphanum(),
    age: Joi.number().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  userUpdateSchema = Joi.object({
    full_name: Joi.string().alphanum(),
    age: Joi.number(),
    email: Joi.string().email(),
    phone: Joi.string(),
  });

  carSchema = Joi.object({
    name: Joi.string().required(),
    year: Joi.number().required().min(2010).max(2020),
    model: Joi.string().required(),
    price: Joi.number().required(),
    color: Joi.string().required(),
  });

  carUpdateSchema = Joi.object({
    name: Joi.string(),
    year: Joi.number().min(2010).max(2020),
    model: Joi.string(),
    price: Joi.number(),
    color: Joi.string(),
  });

  orderSchema = Joi.object({
    car_id: Joi.number().required(),
    user_id: Joi.number().required(),
    amount: Joi.number().required(),
    month_count: Joi.number().valid(1, 3, 6).required(),
    start_date: Joi.string().required(),
    end_date: Joi.string().required(),
  });

  orderUpdateSchema = Joi.object({
    car_id: Joi.number(),
    user_id: Joi.number(),
    month_count: Joi.number().valid(1, 3, 6),
    start_date: Joi.string(),
    end_date: Joi.string(),
  });

  paymentSchema = Joi.object({
    order_id: Joi.number().required(),
    amount: Joi.number().required(),
  });

  paymentUpdateSchema = Joi.object({
    order_id: Joi.number(),
    amount: Joi.number(),
  });
}

export const validation = new Validation();
