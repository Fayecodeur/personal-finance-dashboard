import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string;
}

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Non autorisé, token manquant",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token manquant",
    });
  }

  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({
        message: "JWT_SECRET manquant dans les variables d'environnement",
      });
    }

    const decoded = jwt.verify(token, secret) as unknown as {
      id: string;
    };

    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token invalide",
    });
  }
};
