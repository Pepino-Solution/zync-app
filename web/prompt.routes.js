import express from "express";
import { PromptModel } from "./prompt.model.js";

const router = express.Router();

// GET /api/prompts?shop=loja.myshopify.com
router.get("/", async (req, res) => {
  const shop = req.query.shop;

  if (!shop) return res.status(400).json({ error: "Missing shop param" });

  try {
    const data = await PromptModel.findOne({ shop });
    return res.status(200).json(data || {});
  } catch (err) {
    console.error("Erro ao buscar prompts:", err);
    return res.status(500).json({ error: "Erro ao buscar prompts" });
  }
});

// POST /api/prompts
router.post("/", async (req, res) => {
  const { shop, ...prompts } = req.body;

  if (!shop) return res.status(400).json({ error: "Missing shop in body" });

  try {
    const updated = await PromptModel.findOneAndUpdate(
      { shop },
      { $set: prompts },
      { upsert: true, new: true },
    );

    return res.status(200).json(updated);
  } catch (err) {
    console.error("Erro ao salvar prompts:", err);
    return res.status(500).json({ error: "Erro ao salvar prompts" });
  }
});

export default router;
