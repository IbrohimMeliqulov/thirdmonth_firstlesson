import { orderClass } from "../services/orders.service.js";

class OrderController {
  constructor() {}

  async getAllOrders(req, res) {
    const { id } = req.params;
    const orders = await orderClass.getAllOrders(id);
    return res.status(200).json({
      status: 200,
      message: "Your orders",
      data: orders,
    });
  }

  async deleteOrder(req, res) {
    const { id } = req.params;
    const order = await orderClass.deleteOrder(id);
    return res.status(200).json({
      status: 200,
      message: "Order deleted successfully",
      data: order.rows[0],
    });
  }

  async updateOrder(req, res) {
    const { id } = req.params;
    const updated_order = await orderClass.updateOrder(id, req.body);
    return res.status(200).json({
      status: 200,
      message: "Order updated successfully",
      data: updated_order,
    });
  }

  async createOrder(req, res) {
    const order = await orderClass.createOrder(req.body);
    return res.status(201).json({
      status: 201,
      message: "order created",
      data: order,
    });
  }
}

const orderController = new OrderController();
export default orderController;
