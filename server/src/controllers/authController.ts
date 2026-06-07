import type { Request, Response } from "express";
import type mongoose from "mongoose";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import {
  comparePassword,
  createAccessToken,
  createRefreshToken,
  hashPassword,
  removeRefreshToken,
  saveRefreshToken,
  findUserByRefreshToken,
} from "../services/authService.js";

const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const buildUserResponse = (user: any) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  stage: user.stage,
  hasLoan: user.hasLoan,
});

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedRole = (role || "borrower").toString().toLowerCase();

    const userExists = await User.findOne({ email: normalizedEmail }).lean();
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      hasLoan: false,
      role: normalizedRole,
      stage: "PersonalDetails",
      lastActive: new Date(),
    });

    const accessToken = createAccessToken(user._id.toString(), normalizedRole);
    const refreshToken = createRefreshToken(user._id.toString(), normalizedRole);
    await saveRefreshToken(user._id.toString(), refreshToken);

    res.cookie("refreshToken", refreshToken, refreshCookieOptions);

    return res.status(201).json({
      token: accessToken,
      role: normalizedRole,
      user: buildUserResponse(user),
    });
  } catch (error) {
    return res.status(500).json({ message: "Registration failed", error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.password) {
      return res.status(500).json({ message: "User password missing" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const normalizedRole = (user.role || "borrower").toString().toLowerCase();
    const accessToken = createAccessToken(user._id.toString(), normalizedRole);
    const refreshToken = createRefreshToken(user._id.toString(), normalizedRole);
    await saveRefreshToken(user._id.toString(), refreshToken);

    res.cookie("refreshToken", refreshToken, refreshCookieOptions);
    res.json({ token: accessToken, role: normalizedRole, user: buildUserResponse(user) });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) {
      return res.status(401).json({ message: "Refresh token required" });
    }

    const storedUser = await findUserByRefreshToken(token);
    if (!storedUser) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as {
      id: string;
      role: string;
    };

    if (!decoded?.id) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const accessToken = createAccessToken(decoded.id, decoded.role);
    const nextRefreshToken = createRefreshToken(decoded.id, decoded.role);
    await saveRefreshToken(decoded.id, nextRefreshToken);

    res.cookie("refreshToken", nextRefreshToken, refreshCookieOptions);
    res.json({ token: accessToken, role: decoded.role });
  } catch (error) {
    return res.status(401).json({ message: "Could not refresh session", error });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.refreshToken;
    if (token) {
      await removeRefreshToken(token);
    }

    res.clearCookie("refreshToken");
    res.json({ message: "Logged out" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error });
  }
};