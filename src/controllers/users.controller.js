import { userClass } from "../services/users.service.js";

class UserController {
  constructor() {}

  async register(req, res) {
    const data = await userClass.register(req.body);
    return res.status(data.status).json({
      status: data.status,
      message: data.message,
      data,
    });
  }

  async login(req, res) {
    const data = await userClass.login(req.body);
    return res.status(data.status).json({
      status: data.status,
      message: data.message,
      token: data.token,
    });
  }

  async getAllUsers(req, res) {
    const users = await userClass.getAllUsers();
    return res.status(200).json({
      status: 200,
      message: "Users",
      data: users,
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
