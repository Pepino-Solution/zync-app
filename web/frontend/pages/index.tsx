//React
import { useState, useCallback, useEffect, useRef } from "react";
//Polaris
import {
  Page,
  Modal,
  TextField,
  Form,
  BlockStack,
  Banner,
} from "@shopify/polaris";
import type { PageProps } from "@shopify/polaris";
import { SoundIcon, MagicIcon } from "@shopify/polaris-icons";
//o18n
import { useTranslation } from "react-i18next";
//Utils
import { updateVoiceOnVapi } from "../utils/voiceApi";
import { loadPrompts, savePrompts } from "../utils/promptsMongo";
//Components
import MagicCard from "../components/MagicCard";
import VoiceCallCard from "../components/VoiceCallCard";
//Vapi
import Vapi from "@vapi-ai/web";


// Vars .env - frontend
const SHOP_DOMAIN = import.meta.env.VITE_SHOP_DOMAIN;
const ASSISTANT_ID = import.meta.env.VITE_ASSISTENT_ID;
const VITE_VAPI_PUBLIC_KEY = import.meta.env.VITE_VAPI_PUBLIC_KEY


const HomePage: React.FC = () => {
  //i18n
  const { t } = useTranslation();

  // State management
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
  const [initialPrompts, setInitialPrompts] = useState<Record<string, string>>(
    {},
  );
  const [voiceInput, setVoiceInput] = useState<string>("");
  const [selectedVoice, setSelectedVoice] = useState<string>("Elliot");
  const [isCalling, setIsCalling] = useState<boolean>(false);
  // References management
  const vapiRef = useRef<Vapi | null>(null);

  useEffect(() => {
    (async () => {
      const data = await loadPrompts(SHOP_DOMAIN);

      if (data) {
        // Sets the state with the loaded data
        setFirstMessagePrompt(data.firstMessagePrompt || "");
        setIdentityPrompt(data.identityPrompt || "");
        setStylePrompt(data.stylePrompt || "");
        setGuideLinesPrompt(data.guidelinesPrompt || "");
        setConversationPrompt(data.conversationPrompt || "");
        setErrorPrompt(data.errorPrompt || "");
        setClosingPrompt(data.closingPrompt || "");
        setPromptText(data.promptEdit || "");
        setVoiceInput(data.voiceInput || "");
        setSelectedVoice(data.selectedVoice || "Elliot");

        // Saves the "original" data for rollback
        setInitialPrompts({
          firstMessagePrompt: data.firstMessagePrompt || "",
          identityPrompt: data.identityPrompt || "",
          stylePrompt: data.stylePrompt || "",
          guidelinesPrompt: data.guidelinesPrompt || "",
          conversationPrompt: data.conversationPrompt || "",
          errorPrompt: data.errorPrompt || "",
          closingPrompt: data.closingPrompt || "",
          voiceInput: data.voiceInput || "",
          selectedVoice: data.selectedVoice || "Elliot",
        });

        // Updates the voice in Vapi with the loaded data
        await updateVoiceOnVapi(
          ASSISTANT_ID,
          selectedVoice,
          firstMessagePrompt,
          closingPrompt,
          identityPrompt,
          stylePrompt,
          guidelinesPrompt,
          conversationPrompt,
          errorPrompt,
          voiceInput
        );
      }
    })();
    // Demo call
    if (!vapiRef.current && VITE_VAPI_PUBLIC_KEY) {
      const client = new Vapi(VITE_VAPI_PUBLIC_KEY);
      vapiRef.current = client;

      client.on("call-start", () => {
        setIsCalling(true);
      });

      client.on("call-end", () => {
        console.log("✅ Chamada encerrada.");
        setIsCalling(false);
      });
    }
  }, []);

  // Function to revert changes
  const rollbackChanges = useCallback(() => {
    setFirstMessagePrompt(initialPrompts.firstMessagePrompt || "");
    setIdentityPrompt(initialPrompts.identityPrompt || "");
    setStylePrompt(initialPrompts.stylePrompt || "");
    setGuideLinesPrompt(initialPrompts.guidelinesPrompt || "");
    setConversationPrompt(initialPrompts.conversationPrompt || "");
    setErrorPrompt(initialPrompts.errorPrompt || "");
    setClosingPrompt(initialPrompts.closingPrompt || "");
    setVoiceInput(initialPrompts.voiceInput || "");
    setSelectedVoice(initialPrompts.selectedVoice || "Elliot");
  }, [initialPrompts]);

  // Cancellation modal handlers
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

  // Edit modal handlers
  const handleEditClick = useCallback((): void => {
    setActiveEditModal(true);
  }, []);

  const handleEditClose = useCallback((): void => {
    setActiveEditModal(false);
  }, []);

  const handleEditSubmit = useCallback(async (): Promise<void> => {
    const result = await savePrompts({ promptEdit: promptText }, SHOP_DOMAIN);
    if (result) {
      setActiveEditModal(false);
      setShowSuccess(true); // ou outro feedback
      setTimeout(() => setShowSuccess(false), 3000);
    }
  }, [promptText]);

  const handlePromptChange = useCallback(
    (value: string) => setPromptText(value),
    [],
  );

  // Call handlers
  const handleCallToggle = async () => {
    if (!vapiRef.current) return;

    const vapi = vapiRef.current;

    // Garante que não há chamadas ativas
    await vapi.stop();

    setIsCalling(true);

    await vapiRef.current.start(ASSISTANT_ID);

    setIsCalling(false);
  };

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
      const result = await savePrompts(dataToSave, SHOP_DOMAIN);
      const vapiResult = await updateVoiceOnVapi(
        ASSISTANT_ID,
        selectedVoice,
        firstMessagePrompt,
        closingPrompt,
        identityPrompt,
        stylePrompt,
        guidelinesPrompt,
        conversationPrompt,
        errorPrompt,
        voiceInput
      );
      if (result && vapiResult) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    },
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
      content: isCalling ? t("Buttons.end_call") : t("Buttons.demo_call"),
      icon: SoundIcon,
      onAction: handleCallToggle,
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
        {/* Page content */}
        <BlockStack gap="400">
          <VoiceCallCard
            label={t("VoiceCard.label_agent")}
            labelVoice={t("VoiceCard.label_voice")}
            inputValue={voiceInput}
            onInputChange={setVoiceInput}
            selectedVoice={selectedVoice}
            onVoiceChange={setSelectedVoice}
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

      {/* Cancellation modal */}
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

      {/* Prompt Edit Modal */}
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
            <p
              style={{
                marginTop: "0.5rem",
                color: "#6d7175",
                fontSize: "0.85rem",
              }}
            >
              {t("ModalEdit.info")}
            </p>
          </Form>
        </Modal.Section>
      </Modal>
    </>
  );
};

export default HomePage;
