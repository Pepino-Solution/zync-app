import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt ausente" });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "Você é um assistente que gera textos para apps de atendimento.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 250,
      temperature: 0.7,
    });

    const generated = completion.choices[0].message.content;
    return res.status(200).json({ result: generated });
  } catch (error) {
    console.error("[OpenAI] Erro:", error);
    return res.status(500).json({ error: "Erro ao gerar texto com OpenAI" });
  }
});

export default router;
