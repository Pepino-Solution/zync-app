// This file contains utility functions for interacting with the OpenAI API.
export const generateWithAI = async (prompt: string): Promise<string | null> => {
  try {
    const res = await fetch("/api/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      console.error("Erro da API:", res.statusText);
      return null;
    }

    const data = await res.json();
    return data.result || null;
  } catch (error) {
    console.error("Erro ao chamar OpenAI:", error);
    return null;
  }
};
