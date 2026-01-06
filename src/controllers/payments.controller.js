import { paymentService } from "../services/payments.service.js";

class PaymentController {
  constructor() {}

  async getAllPayments(req, res) {
    const { id } = req.params;
    const result = await paymentService.getAllPayments(id);
    return res.status(200).json({
      status: 200,
      message: "your payments",
      data: result.payments,
      totalPayment: result.user_payments,
    });
  }

  async createPayment(req, res) {
    const payment = await paymentService.createPayment();
    return res.status(201).json({
      status: 201,
      message: "Payment made",
      data: payment,
    });
  }

  async deletePayment(req, res) {
    const { id } = req.params;
    const payment = await paymentService.deletePayment(id);
    return res.status(200).json({
      status: 200,
      message: "Payment deleted",
      data: payment,
    });
  }

  async updatePayment(req, res) {
    const { id } = req.params;
    const updated_payment = await paymentService.updatePayment(id, req.body);
    return res.status(200).json({
      status: 200,
      message: "updated successfully",
      data: updated_payment,
    });
  }
}

const paymentController = new PaymentController();

export default paymentController;
