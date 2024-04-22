import mongoose from "mongoose";

const MemeSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const model = mongoose.models.Meme || mongoose.model("Meme", MemeSchema);
export default model;