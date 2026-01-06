import pg from "../config/config.js";

class CarService {
  constructor() {}

  async getAllCars() {
    const cars = await pg.query("select * from cars");
    return cars;
  }

  async createCar(data) {
    const { name, year, model, price, color } = data;
    const car = await pg.query(
      "insert into cars(name,year,model,price,color) values($1,$2,$3,$4,$5) RETURNING *",
      [name, year, model, price, color]
    );
    return car;
  }

  async deleteCar(id) {
    const car = await pg.query("delete from cars where id=$1 RETURNING *", [
      id,
    ]);
    if (car.rows.length === 0) {
      return {
        status: data.status,
        message: "Id not found",
      };
    }
    return car;
  }

  async updateCar(id, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    let setquery = keys.map((key, i) => `${key}=$${i + 1}`).join(",");
    const query = `UPDATE cars SET ${setquery} WHERE id=$${
      keys.length + 1
    } RETURNING *`;
    const { rows } = await pg.query(query, [...values, id]);
    return rows[0];
  }
}

export const carService = new CarService();
