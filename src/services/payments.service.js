import pg from "../config/config.js";

class PaymentService {
  constructor() {}

  async getAllPayments(id) {
    const payments = await pg.query(
      "select * from payments where order_id=$1",
      [+id]
    );
    let user_payments = 0;
    for (const row of payments.row) {
      user_payments += Number(row.amount);
    }

    if (payments.rows.length === 0) {
      return {
        status: data.status,
        message: "wrong id",
      };
    }
    return { payments, user_payments };
  }

  async createPayment() {
    const payment = await pg.query(
      "insert into payments(order_id,amount) values($1,$2) RETURNING *"
    );
    return payment.rows[0];
  }

  async deletePayment(id) {
    const payment = await pg.query("delete from payments where id=$1", [+id]);
    if (payment.rows.length === 0) {
      return {
        status: data.status,
        message: "Payment not found with this id",
      };
    }
    return payment.rows[0];
  }

  async updatePayment(id, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    let setquery = keys.map((key, i) => `${key}=$${i + 1}`).join(",");
    const query = `UPDATE payments SET ${setquery} WHERE id=$${
      keys.length + 1
    } RETURNING *`;
    const { rows } = await pg.query(query, [...values, id]);
    return rows[0];
  }
}

export const paymentService = new PaymentService();
