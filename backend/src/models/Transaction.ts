import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITransaction extends Document {
  user: Types.ObjectId;
  type: "revenu" | "depense";
  amount: number;
  description: string;
  category: Types.ObjectId;
  date: Date;
}

const transactionSchema = new Schema<ITransaction>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["revenu", "depense"], required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true },
);

export default mongoose.model<ITransaction>("Transaction", transactionSchema);
