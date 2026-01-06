import pg from "../config/config.js";

class UserClass {
  constructor() {}

  async createUser(data) {
    const { full_name, age, email, phone } = data;
    const user = await pg.query(
      "insert into users(full_name,age,email,phone) values($1,$2,$3,$4) RETURNING *",
      [full_name, age, email, phone]
    );
    return user.rows[0];
  }

  async getAllUsers() {
    const users = await pg.query("select * from users");
    return users;
  }

  async deleteUser(id) {
    const user = await pg.query("delete from users where id=$1", [id]);
    if (user.rows.length === 0) {
      return {
        status: data.status,
        message: "user not found",
      };
    }
  }

  async updateUser(id, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    let setquery = keys.map((key, i) => `${key}=$${i + 1}`).join(",");
    const query = `UPDATE users SET ${setquery} WHERE id=$${
      keys.length + 1
    } RETURNING *`;
    const { rows } = await pg.query(query, [...values, id]);
    return rows[0];
  }
}

export const userClass = new UserClass();
