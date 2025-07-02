// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth";
import { loginSchema, registerSchema } from "../validation/auth";

export async function handleRegister(req: Request, res: Response) {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      res.status(400).json({ code: 400, status: "error", message: error.message, data:[] });
      return;
    }

    const { email, password } = req.body;
    const user = await registerUser(email, password);
    res.status(201).json({ code:201, status: "success", message: "User registered", data: user });
  } catch (err: any) {
    res.status(400).json({ code: 400, status: "error", message: err.message, data:[] });
  }
}

export async function handleLogin(req: Request, res: Response) {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      res.status(400).json({ code: 400, status: "error", message: error.message, data:[] });
      return;
    }

    const { email, password } = req.body;

    const result = await loginUser(email, password);
    res.status(200).json({ code: 200, status: "success", message: "Login success", data: {...result} });
  } catch (err: any) {
    res.status(401).json({ code: 401, status: "error", message: err.message, data:[] });
  }
}
