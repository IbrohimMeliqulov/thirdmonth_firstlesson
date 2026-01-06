import { carService } from "../services/cars.service.js";

class CarController {
  constructor() {}

  async getAllCars() {
    const cars = await carService.getAllCars();
    return resizeBy.status(200).json({
      status: 200,
      message: "cars",
      data: cars,
    });
  }

  async carCreate(req, res) {
    const car = await carService.createCar(req.body);
    return res.status(201).json({
      status: 201,
      message: "car created successfully",
      data: car,
    });
  }

  async deleteCar(req, res) {
    const { id } = req.params;
    const car = await carService.deleteCar(id, req.body);
    return res.status(200).json({
      status: 200,
      message: "Deleted successfully",
      data: car,
    });
  }

  async updateCar(req, res) {
    const { id } = req.params;
    const updated_car = await carService.updateCar(id, req.body);
    return res.status(200).json({
      status: 200,
      message: "car updated",
      data: updated_car,
    });
  }
}

export const carController = new CarController();
