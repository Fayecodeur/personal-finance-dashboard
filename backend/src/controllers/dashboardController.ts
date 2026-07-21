import { Response } from "express";
import Transaction from "../models/Transaction";
import { AuthRequest } from "../middlewares/authMiddleware";

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const filter: Record<string, any> = { user: req.userId as string };

    const transactions = await Transaction.find(filter).populate("category");
    let totalRevenus = 0;
    let totalDepenses = 0;
    const byCategory: Record<string, number> = {};
    const byMonth: Record<string, { revenus: number; depenses: number }> = {};

    for (const t of transactions) {
      const amount = t.amount;

      if (t.type === "revenu") {
        totalRevenus += amount;
      } else {
        totalDepenses += amount;
        const categoryName = (t.category as any)?.name || "Sans catégorie";
        byCategory[categoryName] = (byCategory[categoryName] || 0) + amount;
      }

      const monthKey = new Date(t.date).toISOString().slice(0, 7); // "2026-07"
      if (!byMonth[monthKey]) {
        byMonth[monthKey] = { revenus: 0, depenses: 0 };
      }
      if (t.type === "revenu") {
        byMonth[monthKey].revenus += amount;
      } else {
        byMonth[monthKey].depenses += amount;
      }
    }

    const monthlyEvolution = Object.entries(byMonth)
      .map(([month, values]) => ({ month, ...values }))
      .sort((a, b) => a.month.localeCompare(b.month));

    res.status(200).json({
      solde: totalRevenus - totalDepenses,
      totalRevenus,
      totalDepenses,
      totalTransactions: transactions.length,
      depensesByCategory: byCategory,
      monthlyEvolution,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
