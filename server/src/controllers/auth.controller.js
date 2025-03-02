import {
  registerAccountService,
  loginAccountService,
} from "../services/auth.service.js";

export const registerAccount = async (req, res) => {
  try {
    const result = await registerAccountService(req.body);
    const { message, data } = result;
    res.status(message === "success" ? 201 : 400).json({
      message,
      data,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", data: null });
  }
};

export const loginAccount = async (req, res) => {
  try {
    const result = await loginAccountService(req.body);
    res.status(result.message === "success" ? 200 : 400).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", data: null });
  }
};
