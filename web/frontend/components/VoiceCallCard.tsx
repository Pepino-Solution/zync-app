//React
import React, { useRef, useEffect, useState } from "react";
//Polaris
import {
  Card,
  TextField,
  Select,
  Button,
  InlineStack,
  BlockStack,
  InlineGrid,
  Spinner
} from "@shopify/polaris";
import { SoundIcon } from "@shopify/polaris-icons";
//i18n
import { useTranslation } from "react-i18next";
//Vapi
import Vapi from "@vapi-ai/web";

const VAPI_PUBLIC_KEY = import.meta.env.VITE_VAPI_PUBLIC_KEY;

interface VoiceCallCardProps {
  label: string;
  labelVoice: string;
  inputValue: string;
  onInputChange: (value: string) => void;
  selectedVoice: string;
  onVoiceChange: (value: string) => void;
}

const VoiceCallCard: React.FC<VoiceCallCardProps> = ({
  label,
  inputValue,
  onInputChange,
  selectedVoice,
  onVoiceChange,
  labelVoice
}) => {
  const { t } = useTranslation();
  const vapiRef = useRef<Vapi | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const voiceOptions = [
    { label: "Elliot", value: "Elliot" },
    { label: "Hana", value: "Hana" }
  ];

  useEffect(() => {
    if (!VAPI_PUBLIC_KEY) {
      console.error("VAPI_PUBLIC_KEY não está definido.");
      return;
    }

    const client = new Vapi(VAPI_PUBLIC_KEY);
    vapiRef.current = client;

    client.on("speech-end", () => {
      client.stop();
      setIsLoading(false);
    });

    return () => {
      client.stop();
    };
  }, []);

  const handlePlaySample = async () => {
    if (!vapiRef.current) return;

    setIsLoading(true);
    const vapi = vapiRef.current;

    // Ensures there are no active calls
    await vapi.stop();

    // Creat Assistant
    const assistantConfig: {} = {
      name: "Preview Voice",
      firstMessage: "Olá, tudo bem? Em que posso ajudar?",
      voice: {
        provider: "vapi",
        voiceId: selectedVoice as
          | "Elliot"
          | "Hana",
        language: "pt-BR",
      },
      model: {
        provider: "openai",
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "Você é um assistente de voz amigável para demonstração.",
          },
        ],
      },
    };

    // Call Assistant
    vapiRef.current.start(assistantConfig);
  };

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
            {isLoading ? (
              <Button
                icon={<Spinner accessibilityLabel="Carregando..." size="small" />}
                disabled
                size="large"
              />
            ) : (
              <Button
                icon={SoundIcon}
                onClick={handlePlaySample}
                accessibilityLabel={t("Buttons.sound")}
                size="large"
              />
            )}
          </InlineStack>
        </InlineGrid>
      </BlockStack>
    </Card>
  );
};

export default VoiceCallCard;
