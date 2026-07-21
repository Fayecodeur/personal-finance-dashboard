import { Response } from "express";
import User from "../models/User";
import { AuthRequest } from "../middlewares/authMiddleware";

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, email },
      { new: true },
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
