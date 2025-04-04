import express from "express";
import { updateAssistantVoice } from "./controllers/vapi.controller.js";

const router = express.Router();

router.post("/update-voice", async (req, res) => {
  const {
    assistantId,
    voiceId,
    firstMessage,
    endCallMessage,
    identityPrompt,
    stylePrompt,
    guidelinesPrompt,
    conversationPrompt,
    errorPrompt,
    voiceInput,
  } = req.body;

  if (!assistantId || !voiceId) {
    return res
      .status(400)
      .json({ error: "Parâmetros 'assistantId' ou 'voiceId' ausentes" });
  }

  try {
    console.log("aqui acontece a vapi.routs.js");
    await updateAssistantVoice(
      assistantId,
      voiceId,
      firstMessage,
      endCallMessage,
      identityPrompt,
      stylePrompt,
      guidelinesPrompt,
      conversationPrompt,
      errorPrompt,
      voiceInput,
    );
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar voz do assistente" });
  }
});

export default router;
