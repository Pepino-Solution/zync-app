import { useState, useCallback, useEffect } from "react";
import {
  Page,
  Modal,
  TextField,
  Form,
  BlockStack,
  Banner
} from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import type { PageProps } from "@shopify/polaris";
import { SoundIcon, MagicIcon } from "@shopify/polaris-icons";
import MagicCard from "../components/MagicCard";
import VoiceCallCard from "../components/VoiceCallCard";

const SHOP_DOMAIN = "pepino-developer.myshopify.com";

const loadPrompts = async () => {
  try {
    const res = await fetch(`/api/prompts?shop=${SHOP_DOMAIN}`);
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Erro ao carregar prompts:", error);
    return null;
  }
};

const savePrompts = async (prompts: Record<string, string>) => {
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

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const [activeCancelModal, setActiveCancelModal] = useState<boolean>(false);
  const [activeEditModal, setActiveEditModal] = useState<boolean>(false);
  const [promptText, setPromptText] = useState<string>("");
  const [firstMessagePrompt, setFirstMessagePrompt] = useState<string>("");
  const [identityPrompt, setIdentityPrompt] = useState<string>("");
  const [stylePrompt, setStylePrompt] = useState<string>("");
  const [guidelinesPrompt, setGuideLinesPrompt] = useState<string>("");
  const [conversationPrompt, setConversationPrompt] = useState<string>("");
  const [errorPrompt, setErrorPrompt] = useState<string>("");
  const [closingPrompt, setClosingPrompt] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [initialPrompts, setInitialPrompts] = useState<Record<string, string>>({});
  const [voiceInput, setVoiceInput] = useState<string>("");
  const [selectedVoice, setSelectedVoice] = useState<string>("Josh");


  useEffect(() => {
    (async () => {
      const data = await loadPrompts();

      if (data) {
        setFirstMessagePrompt(data.firstMessagePrompt || "");
        setIdentityPrompt(data.identityPrompt || "");
        setStylePrompt(data.stylePrompt || "");
        setGuideLinesPrompt(data.guidelinesPrompt || "");
        setConversationPrompt(data.conversationPrompt || "");
        setErrorPrompt(data.errorPrompt || "");
        setClosingPrompt(data.closingPrompt || "");
        setPromptText(data.promptEdit || "");
        setVoiceInput(data.voiceInput || "");
        setSelectedVoice(data.selectedVoice || "Josh");

        // Salva os dados "originais" para rollback
        setInitialPrompts({
          firstMessagePrompt: data.firstMessagePrompt || "",
          identityPrompt: data.identityPrompt || "",
          stylePrompt: data.stylePrompt || "",
          guidelinesPrompt: data.guidelinesPrompt || "",
          conversationPrompt: data.conversationPrompt || "",
          errorPrompt: data.errorPrompt || "",
          closingPrompt: data.closingPrompt || "",
          voiceInput: data.voiceInput || "",
          selectedVoice: data.selectedVoice || "Josh",
        });
      }
    })();
  }, []);

  const rollbackChanges = useCallback(() => {
    setFirstMessagePrompt(initialPrompts.firstMessagePrompt || "");
    setIdentityPrompt(initialPrompts.identityPrompt || "");
    setStylePrompt(initialPrompts.stylePrompt || "");
    setGuideLinesPrompt(initialPrompts.guidelinesPrompt || "");
    setConversationPrompt(initialPrompts.conversationPrompt || "");
    setErrorPrompt(initialPrompts.errorPrompt || "");
    setClosingPrompt(initialPrompts.closingPrompt || "");
    setVoiceInput(initialPrompts.voiceInput || "");
    setSelectedVoice(initialPrompts.selectedVoice || "Josh");
  }, [initialPrompts]);

  // Handlers do modal de cancelamento
  const handleCancelClick = useCallback((): void => {
    setActiveCancelModal(true);
  }, []);

  const handleModalCancelClose = useCallback((): void => {
    setActiveCancelModal(false);
  }, []);

  const handleConfirmCancel = useCallback((): void => {
    setActiveCancelModal(false);
    rollbackChanges();
  }, [rollbackChanges]);

  // Handlers do modal de edição
  const handleEditClick = useCallback((): void => {
    setActiveEditModal(true);
  }, []);

  const handleEditClose = useCallback((): void => {
    setActiveEditModal(false);
  }, []);

  const handleEditSubmit = useCallback(async (): Promise<void> => {
    const result = await savePrompts({ promptEdit: promptText });
    if (result) {
      setActiveEditModal(false);
      setShowSuccess(true); // ou outro feedback
      setTimeout(() => setShowSuccess(false), 3000);
    }
  }, [promptText]);

  const handlePromptChange = useCallback(
    (value: string) => setPromptText(value),
    []
  );

  // primaryAction of Page
  const primaryAction: PageProps["primaryAction"] = {
    content: t("Buttons.save"),
    onAction: async () => {
      const dataToSave = {
        firstMessagePrompt,
        identityPrompt,
        stylePrompt,
        guidelinesPrompt,
        conversationPrompt,
        errorPrompt,
        closingPrompt,
        voiceInput,
        selectedVoice,
      };
      const result = await savePrompts(dataToSave);
      if (result) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    }
  };

  // secondaryActions of Page
  const secondaryActions: PageProps["secondaryActions"] = [
    {
      content: t("Buttons.cancel"),
      onAction: handleCancelClick,
      accessibilityLabel: t("Acessibility.cancel_mod"),
    },
    {
      content: t("Buttons.edit_prompt"),
      icon: MagicIcon,
      accessibilityLabel: t("Acessibility.edit_prompt"),
      onAction: handleEditClick,
    },
    {
      content: t("Buttons.demo_call"),
      icon: SoundIcon,
      onAction: () => alert("Abrir demo call"),
    },
  ];

  return (
    <>
      {showSuccess && (
        <Banner
          title={t("Toast.success")}
          tone="success"
          onDismiss={() => setShowSuccess(false)}
        />
      )}
      <Page
        fullWidth
        title={t("HomePage.title")}
        primaryAction={primaryAction}
        secondaryActions={secondaryActions}
      >

        {/* Conteúdo da página */}
        <BlockStack gap="400">
          <VoiceCallCard
            label={t("VoiceCard.label_agent")}
            labelVoice={t("VoiceCard.label_voice")}
            inputValue={voiceInput}
            onInputChange={setVoiceInput}
            selectedVoice={selectedVoice}
            onVoiceChange={setSelectedVoice}
            onCall={() => {
              console.log("Chamando Vapi com:", {
                text: voiceInput,
                voice: selectedVoice,
              });
              // Aqui futuramente você chama sua integração com o vapi.ai
            }}
          />
          <MagicCard
            title={t("MagicCard.first_mensage")}
            tooltipText={t("MagicCard.info_first_mensage")}
            textValue={firstMessagePrompt}
            onTextChange={setFirstMessagePrompt}
          />
          <MagicCard
            title={t("MagicCard.identity")}
            tooltipText={t("MagicCard.info_identity")}
            textValue={identityPrompt}
            onTextChange={setIdentityPrompt}
          />
          <MagicCard
            title={t("MagicCard.style")}
            tooltipText={t("MagicCard.info_style")}
            textValue={stylePrompt}
            onTextChange={setStylePrompt}
          />
          <MagicCard
            title={t("MagicCard.guidelines")}
            tooltipText={t("MagicCard.info_guidelines")}
            textValue={guidelinesPrompt}
            onTextChange={setGuideLinesPrompt}
          />
          <MagicCard
            title={t("MagicCard.conversation")}
            tooltipText={t("MagicCard.info_conversation")}
            textValue={conversationPrompt}
            onTextChange={setConversationPrompt}
          />
          <MagicCard
            title={t("MagicCard.error")}
            tooltipText={t("MagicCard.info_error")}
            textValue={errorPrompt}
            onTextChange={setErrorPrompt}
          />
          <MagicCard
            title={t("MagicCard.closing")}
            tooltipText={t("MagicCard.info_closing")}
            textValue={closingPrompt}
            onTextChange={setClosingPrompt}
          />
        </BlockStack>
      </Page>

      {/* Modal de cancelamento */}
      <Modal
        open={activeCancelModal}
        onClose={handleModalCancelClose}
        title={t("ModalCancel.title")}
        primaryAction={{
          content: t("ModalCancel.button_2"),
          onAction: handleConfirmCancel,
          destructive: true,
        }}
        secondaryActions={[
          {
            content: t("ModalCancel.button_1"),
            onAction: handleModalCancelClose,
          },
        ]}
      >
        <Modal.Section>
          <p>{t("ModalCancel.text")}</p>
        </Modal.Section>
      </Modal>

      {/* Modal de edição de prompt */}
      <Modal
        open={activeEditModal}
        onClose={handleEditClose}
        title={t("ModalEdit.title")}
        primaryAction={{
          content: t("ModalEdit.submit"),
          onAction: handleEditSubmit,
        }}
        secondaryActions={[
          {
            content: t("ModalEdit.cancel"),
            onAction: handleEditClose,
          },
        ]}
      >
        <Modal.Section>
          <Form onSubmit={handleEditSubmit}>
            <TextField
              label=""
              value={promptText}
              onChange={handlePromptChange}
              multiline={4}
              autoComplete="off"
              placeholder={t("ModalEdit.placeholder")}
            />
            <p style={{ marginTop: "0.5rem", color: "#6d7175", fontSize: "0.85rem" }}>
              {t("ModalEdit.info")}
            </p>
          </Form>
        </Modal.Section>
      </Modal>
    </>
  );
};

export default HomePage;
