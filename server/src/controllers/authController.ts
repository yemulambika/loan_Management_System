import type { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const normalizedRole = (role || "borrower").toString().toLowerCase();

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      hasLoan: false,
      role: normalizedRole,
      stage: "PersonalDetails",
      lastActive: new Date(),
    });

    return res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      stage: user.stage,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};;export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
if (!user?.password) {
  throw new Error("Password not found for user");
}

const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const normalizedRole = (user.role || "borrower").toString().toLowerCase();

    const token = jwt.sign(
      {
        id: user._id,
        role: normalizedRole,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      role: normalizedRole,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};