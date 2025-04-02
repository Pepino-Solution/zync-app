// Componente VoiceCallCard.tsx
import {
  Card,
  TextField,
  Select,
  Button,
  InlineStack,
  BlockStack,
  InlineGrid,
} from "@shopify/polaris";
import { SoundIcon } from "@shopify/polaris-icons";
import { useTranslation } from "react-i18next";
import React from "react";

interface VoiceCallCardProps {
  label: string;
  labelVoice: string;
  inputValue: string;
  onInputChange: (value: string) => void;
  selectedVoice: string;
  onVoiceChange: (value: string) => void;
  onCall: () => void;
}

const VoiceCallCard: React.FC<VoiceCallCardProps> = ({
  label,
  inputValue,
  onInputChange,
  selectedVoice,
  onVoiceChange,
  onCall,
  labelVoice
}) => {
  const { t } = useTranslation();

  const voiceOptions = [
    { label: "Josh", value: "Josh" },
    { label: "Ana", value: "Ana" },
    { label: "Jhon", value: "Jhon" },
    { label: "Liz", value: "Liz" },
    { label: "Spike", value: "Spike" }
  ];

  return (
    <Card padding="400">
      <BlockStack gap="300">
        <InlineGrid gap="300" columns={3}>
          <TextField
            label={label}
            value={inputValue}
            onChange={onInputChange}
            autoComplete="off"
          />
          <Select
            label={labelVoice}
            options={voiceOptions}
            value={selectedVoice}
            onChange={onVoiceChange}
          />
          <InlineStack blockAlign="end">
            <Button
              icon={SoundIcon}
              onClick={onCall}
              accessibilityLabel={t("Buttons.sound")}
              size="large"
            />
          </InlineStack>
        </InlineGrid>
      </BlockStack>
    </Card>
  );
};

export default VoiceCallCard;
