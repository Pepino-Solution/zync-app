// This file contains functions to interact with the VAPI API for voice-related operations.
export async function updateVoiceOnVapi(
  assistantId: string,
  voiceId: string,
  firstMessage: string,
  endCallMessage: string,
  identityPrompt: string,
  stylePrompt: string,
  guidelinesPrompt: string,
  conversationPrompt: string,
  errorPrompt: string,
  agentName: string
): Promise<boolean> {
  try {
    const res = await fetch("/api/vapi/update-voice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        assistantId,
        voiceId,
        firstMessage,
        endCallMessage,
        identityPrompt,
        stylePrompt,
        guidelinesPrompt,
        conversationPrompt,
        errorPrompt,
        agentName,
      }),
    });

    console.log("VoiceApi.ts disparada", assistantId, voiceId, res);
    if (!res.ok) throw new Error("Falha ao atualizar voz");

    return true;
  } catch (error) {
    console.error("❌ Erro ao atualizar voz no Vapi:", error);
    return false;
  }
}
