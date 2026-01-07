import pg from "../config/config.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

class UserClass {
  constructor() {}

  async register(data) {
    const { full_name, age, email, password, phone } = data;
    const existUser = await pg.query("select * from users where email=$1", [
      email,
    ]);

    if (existUser.rows.length) {
      return {
        status: 409,
        message: "You already registered.Please go to the login page",
      };
    }

    const passHash = await bcrypt.hash(password, 10);
    const user = await pg.query(
      "insert into users(full_name,age,email,password,phone) values($1,$2,$3,$4,$5) RETURNING *",
      [full_name, age, email, passHash, phone]
    );
    const accessToken = Jwt.sign(
      { id: user.rows[0].id, email: user.rows[0].email },
      "shaftoli",
      { expiresIn: "10m" }
    );
    return {
      status: 201,
      message: "registered successully",
      accessToken,
    };
  }

  async login(data) {
    const { email, password } = data;
    const existUser = await pg.query("select * from users where email=$1", [
      email,
    ]);

    if (existUser.rows.length) {
      return {
        status: 409,
        message: "You don't have an account.Please go to the register page",
      };
    }
    const userPassword = await existUser.rows[0].password;
    const passwordCompare = await bcrypt.compare(password, userPassword);

    if (passwordCompare) {
      return {
        message: "Password wrong",
      };
    }
    const user_id = await existUser.rows[0].id;
    const accessToken = Jwt.sign({ id: user_id, email: email }, "shaftoli", {
      expiresIn: "10m",
    });
    return {
      status: 200,
      message: "You successfully logged in",
      token: accessToken,
    };
  }

  async getAllUsers() {
    const users = await pg.query("select * from users");
    return users.rows;
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
