import pg from "../config/config.js";

class OrderClass {
  constructor() {}

  async createOrder(data) {
    const { car_id, user_id, month_count, amount, start_date, end_date } = data;
    const car = pg.query("select price from cars where id=$1", [car_id]);
    const percent = car.rows[0].price * 0.2;

    if (percent > amount) {
      return {
        status: 400,
        message: "Boshlang'ich to'lova yetarli emas",
      };
    }

    const order = await pg.query(
      "insert into orders(car_id, user_id, month_count,start_date, end_date) values($1,$2,$3,$4,$5) RETURNING *",
      [car_id, user_id, month_count, start_date, end_date]
    );

    const order_id = order.rows[0].id;
    await pg.query("insert into payments (order_id,amount) values($1,$2)", [
      order_id,
      amount,
    ]);

    return order.rows[0];
  }

  async getAllOrders(id) {
    const orders = await pg.query("select * from orders where user_id=$1", [
      +id,
    ]);
    return orders.rows[0];
  }

  async deleteOrder(id) {
    const order = await pg.query("delete from orders where id=$1 RETURNING *", [
      id,
    ]);
    if (order.rows.length === 0) {
      return {
        status: data.status,
        message: "Order not found",
      };
    }
    return order;
  }

  async updateOrder(id, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    let setquery = keys.map((key, i) => `${key}=$${i + 1}`).join(",");
    const query = `UPDATE orders SET ${setquery} WHERE id=$${
      keys.length + 1
    } RETURNING *`;
    const { rows } = await pg.query(query, [...values, id]);
    return rows[0];
  }
}

export const orderClass = new OrderClass();
