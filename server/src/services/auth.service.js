import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Account from "../models/account.model.js";
import { generateToken } from "../utils/generateToken.js";

export const registerAccountService = async (data) => {
  try {
    const { name, email, password, confirmPassword } = data;
    if (!name || !password || !confirmPassword || !email) {
      return {
        message: "Vui lòng nhập đầy đủ thông tin",
        data: null,
      };
    }
    if (password !== confirmPassword) {
      return {
        message: "Mật khẩu không khớp",
        data: null,
      };
    }
    const existUser = await Account.findOne({ email });
    if (existUser) {
      return {
        message: "Email đã tồn tại",
        data: null,
      };
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    await Account.create({
      name,
      email,
      password: hashPassword,
    });
    return {
      message: "success",
      data: {
        name,
        email,
      },
    };
  } catch (error) {
    return {
      message: error.message,
      data: null,
    };
  }
};

export const loginAccountService = async (data) => {
  try {
    const { email, password } = data;
    const user = await Account.findOne({ email });
    if (!user) {
      return {
        message: "Email không tồn tại",
        data: null,
      };
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return {
        message: "Mật khẩu không đúng",
        data: null,
      };
    }
    const accessToken = generateToken(user._id);
    return {
      message: "success",
      data: {
        accessToken,    
      },
    };
  } catch (error) {
    return {
      message: error.message,
      data: null,
    };
  }
};

