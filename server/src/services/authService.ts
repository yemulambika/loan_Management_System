import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return bcrypt.compare(password, hashedPassword);
};

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is required");
  }
  return process.env.JWT_SECRET;
};

const getRefreshTokenSecret = () => {
  return process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET || "refresh-secret";
};

export const createAccessToken = (id: string, role: string) => {
  return jwt.sign(
    { id, role },
    getJwtSecret(),
    {
      expiresIn: "15m",
    }
  );
};

export const createRefreshToken = (id: string, role: string) => {
  return jwt.sign(
    { id, role },
    getRefreshTokenSecret(),
    {
      expiresIn: "7d",
    }
  );
};

export const saveRefreshToken = async (
  userId: string,
  refreshToken: string
) => {
  await User.findByIdAndUpdate(userId, { refreshToken }, { new: true });
};

export const removeRefreshToken = async (refreshToken: string) => {
  await User.findOneAndUpdate(
    { refreshToken },
    { refreshToken: null },
    { new: true }
  );
};

export const findUserByRefreshToken = async (refreshToken: string) => {
  return User.findOne({ refreshToken });
};
