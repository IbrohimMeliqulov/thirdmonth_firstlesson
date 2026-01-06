import { userClass } from "../services/users.service.js";

class UserController {
  constructor() {}

  async createUser(req, res) {
    const user = await userClass.createUser(req.body);
    return res.status(201).json({
      status: 201,
      message: "user created",
      data: user,
    });
  }

  async getAllUsers(req, res) {
    const users = await userClass.getAllUsers();
    return res.status(200).json({
      status: 200,
      message: "Users",
      data: users.rows[0],
    });
  }
  async updateUser(req, res) {
    const { id } = req.params;
    const user = await userClass.updateUser(id, req.body);
    return res.status(200).json({
      status: 200,
      message: "user updated successfully",
      data: user,
    });
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    const user = await userClass.deleteUser(id);
    return res.status(200).json({
      status: 200,
      message: "User deleted",
      data: user,
    });
  }
}

export const userController = new UserController();
