// src/controllers/auth.controller.ts
import { RequestHandler } from "express";
import { registerUser, loginUser } from "../services/auth";
import { loginSchema, registerSchema } from "../validation/auth";

export const handleRegister:RequestHandler = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      res.status(400).json({ code: 400, status: "error", message: error.message, data:[] });
      return;
    }


    if (!req.file) {
      res.status(400).json({ code: 400, status: "error", message: "no file upload", data:[] });
      return;
    }

    const { email, password } = req.body;
    const profile = req.file?.filename
    const user = await registerUser(email, password, profile);
    res.status(201).json({ code:201, status: "success", message: "User registered", data: user });
  } catch (err: any) {
    res.status(400).json({ code: 400, status: "error", message: err.message, data:[] });
  }
}

export const handleLogin: RequestHandler = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      res.status(400).json({ code: 400, status: "error", message: error.message, data:[] });
      return;
    }

    const { email, password } = req.body;
    const result = await loginUser(email, password);

    res.cookie("token", result, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
    });

    res.status(200).json({ code: 200, status: "success", message: "Login success", data: {...result} });
  } catch (err: any) {
    res.status(401).json({ code: 401, status: "error", message: err.message, data:[] });
  }
}
