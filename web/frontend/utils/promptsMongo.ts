// Load prompts from MongoDB and save them to MongoDB
export const loadPrompts = async (SHOP_DOMAIN:string) => {
  try {
    const res = await fetch(`/api/prompts?shop=${SHOP_DOMAIN}`);
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Erro ao carregar prompts:", error);
    return null;
  }
};

// Save prompts to MongoDB
export const savePrompts = async (prompts: Record<string, string>, SHOP_DOMAIN:string) => {
  try {
    const res = await fetch("/api/prompts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shop: SHOP_DOMAIN,
        ...prompts,
      }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro ao salvar prompts:", error);
    return null;
  }
};