import {
  Card,
  Text,
  TextField,
  Tooltip,
  Icon,
  Button,
  InlineStack,
  Box,
  Modal,
  Form,
} from "@shopify/polaris";
import { QuestionCircleIcon, MagicIcon } from "@shopify/polaris-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { generateWithAI } from "../utils/openaiUtils";

interface MagicCardProps {
  title: string;
  tooltipText: string;
  textValue: string;
  onTextChange: (value: string) => void;
}

const MagicCard: React.FC<MagicCardProps> = ({
  title,
  tooltipText,
  textValue,
  onTextChange,
}) => {
  const { t } = useTranslation();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalValue, setModalValue] = useState("");

  const handleOpenModal = () => {
    setModalValue("");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirm = async () => {
    if (!modalValue.trim()) return;

    try {
      const result = await generateWithAI(modalValue);
      if (result) {
        onTextChange(result); // Atualiza o campo do MagicCard com o resultado da IA
      }
    } catch (error) {
      console.error("Erro ao gerar texto com IA:", error);
    }

    setModalOpen(false);
  };


  return (
    <>
      <Card padding="400">
        <InlineStack align="space-between" blockAlign="center">
          <InlineStack gap="200" blockAlign="center">
            <Text variant="bodyMd" fontWeight="semibold" as="h2">
              {title}
            </Text>
            <Tooltip content={tooltipText}>
              <span>
                <Icon source={QuestionCircleIcon} tone="base" />
              </span>
            </Tooltip>
          </InlineStack>
          <Button icon={MagicIcon} onClick={handleOpenModal} />
        </InlineStack>

        <Box paddingBlockStart="300">
          <TextField
            label=""
            value={textValue}
            onChange={onTextChange}
            multiline={4}
            autoComplete="off"
          />
        </Box>
      </Card>

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        title={`Editar ${title}`}
        primaryAction={{
          content: t("ModalEdit.submit"),
          onAction: handleConfirm,
        }}
        secondaryActions={[
          {
            content: t("ModalEdit.cancel"),
            onAction: handleCloseModal,
          },
        ]}
      >
        <Modal.Section>
          <Form onSubmit={handleConfirm}>
            <TextField
              label=""
              value={modalValue}
              onChange={setModalValue}
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

export default MagicCard;
