import mongoose from "mongoose";

const PromptSchema = new mongoose.Schema({
  shop: { type: String, required: true, unique: true },

  firstMessagePrompt: { type: String, default: "" },
  identityPrompt: { type: String, default: "" },
  stylePrompt: { type: String, default: "" },
  guidelinesPrompt: { type: String, default: "" },
  conversationPrompt: { type: String, default: "" },
  errorPrompt: { type: String, default: "" },
  closingPrompt: { type: String, default: "" },
  promptEdit: { type: String, default: "" },
  voiceInput: { type: String, default: "" },
  selectedVoice: { type: String, default: "Josh" },
});

export const PromptModel =
  mongoose.models.Prompt || mongoose.model("Prompt", PromptSchema);
