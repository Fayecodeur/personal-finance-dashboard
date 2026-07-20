import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICategory extends Document {
  user: Types.ObjectId;
  name: string;
  type: "revenu" | "depense";
}

const categorySchema = new Schema<ICategory>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ["revenu", "depense"], required: true },
  },
  { timestamps: true },
);

export default mongoose.model<ICategory>("Category", categorySchema);
