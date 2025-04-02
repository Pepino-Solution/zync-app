import {
  Card,
  Text,
  TextField,
  Tooltip,
  Icon,
  Button,
  InlineStack,
  Box,
} from "@shopify/polaris";
import { QuestionCircleIcon, MagicIcon } from "@shopify/polaris-icons";
import React from "react";

interface MagicCardProps {
  title: string;
  tooltipText: string;
  textValue: string;
  onTextChange: (value: string) => void;
  onMagicClick: () => void;
}

const MagicCard: React.FC<MagicCardProps> = ({
  title,
  tooltipText,
  textValue,
  onTextChange,
  onMagicClick,
}) => {
  return (
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
        <Button icon={MagicIcon} onClick={onMagicClick}>
          Magic
        </Button>
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
  );
};

export default MagicCard;
