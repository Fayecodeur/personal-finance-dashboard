import { Response } from "express";
import Category from "../models/Category";
import { AuthRequest } from "../middlewares/authMiddleware";

export const createCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { name, type } = req.body;

    if (!name || !type) {
      return res.status(400).json({ message: "Nom et type requis" });
    }

    const category = await Category.create({
      user: req.userId as string,
      name,
      type,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

export const getCategories = async (req: AuthRequest, res: Response) => {
  try {
    const filter: Record<string, any> = { user: req.userId as string };
    const categories = await Category.find(filter);
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

export const updateCategory = async (req: AuthRequest, res: Response) => {
  try {
    const filter: Record<string, any> = {
      _id: req.params.id,
      user: req.userId as string,
    };
    const category = await Category.findOneAndUpdate(filter, req.body, {
      new: true,
    });

    if (!category) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

export const deleteCategory = async (req: AuthRequest, res: Response) => {
  try {
    const filter: Record<string, any> = {
      _id: req.params.id,
      user: req.userId as string,
    };
    const category = await Category.findOneAndDelete(filter);

    if (!category) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    res.status(200).json({ message: "Catégorie supprimée" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
