import { useState, useCallback } from "react";
import {
  Page,
  Modal,
  TextField,
  Form,
  BlockStack
} from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import type { PageProps } from "@shopify/polaris";
import { SoundIcon, MagicIcon } from "@shopify/polaris-icons";
import MagicCard from "../components/MagicCard";

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

  // Handlers do modal de cancelamento
  const handleCancelClick = useCallback((): void => {
    setActiveCancelModal(true);
  }, []);

  const handleModalCancelClose = useCallback((): void => {
    setActiveCancelModal(false);
  }, []);

  const handleConfirmCancel = useCallback((): void => {
    setActiveCancelModal(false);
    alert("Alterações descartadas.");
  }, []);

  // Handlers do modal de edição
  const handleEditClick = useCallback((): void => {
    setActiveEditModal(true);
  }, []);

  const handleEditClose = useCallback((): void => {
    setActiveEditModal(false);
  }, []);

  const handleEditSubmit = useCallback((): void => {
    setActiveEditModal(false);
    alert(`Prompt editado: ${promptText}`);
  }, [promptText]);

  const handlePromptChange = useCallback(
    (value: string) => setPromptText(value),
    []
  );

  // primaryAction of Page
  const primaryAction: PageProps["primaryAction"] = {
    content: "Save",
    onAction: () => alert("Salvar alterações"),
  };

  // secondaryActions of Page
  const secondaryActions: PageProps["secondaryActions"] = [
    {
      content: t("Buttons.cancel"),
      onAction: handleCancelClick,
      accessibilityLabel: "Cancelar alterações",
    },
    {
      content: t("Buttons.edit_prompt"),
      icon: MagicIcon,
      accessibilityLabel: "Editar prompt completo",
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
      <Page
        fullWidth
        title={t("HomePage.title")}
        primaryAction={primaryAction}
        secondaryActions={secondaryActions}
      >
        {/* Conteúdo da página */}
        <BlockStack gap="400">
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
