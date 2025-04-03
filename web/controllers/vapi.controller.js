import { VapiClient } from "@vapi-ai/server-sdk";
import dotenv from "dotenv";
dotenv.config();

const client = new VapiClient({ token: process.env.VAPI_PRIVATE_API_KEY });

/**
 * Atualiza a voz do assistente na Vapi.ai
 */
export async function updateAssistantVoice(
  assistantId,
  voiceId,
  firstMessage,
  endCallMessage,
  identityPrompt,
  stylePrompt,
  guidelinesPrompt,
  conversationPrompt,
  errorPrompt,
) {
  const structuredPrompt = `
    ## Identidade
    ${identityPrompt}

    ## Estilo
    ${stylePrompt}

    ## Diretrizes de resposta
    ${guidelinesPrompt}

    ## Fluxo de conversação e perguntas da pesquisa
    ${conversationPrompt}

    ## Tratamento de erros
    ${errorPrompt}
  `.trim();
  try {
    const response = await client.assistants.update(assistantId, {
      voice: {
        provider: "vapi",
        voiceId: voiceId,
        language: "pt-BR",
      },
      firstMessage: firstMessage || "",
      endCallMessage: endCallMessage || "",
      model: {
        provider: "openai",
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: structuredPrompt,
          },
        ],
      },
    });

    console.log("✅ Voz do assistente atualizada:", response);
    return response;
  } catch (error) {
    console.error("❌ Erro ao atualizar voz do assistente:", error);
    throw error;
  }
}
