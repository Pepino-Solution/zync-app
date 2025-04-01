import { Page } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";

export default function Transcriptions() {
  const { t, i18n } = useTranslation();

  return (
    <Page>
      <TitleBar title={t("Transcriptions.title")}></TitleBar>
    </Page>
  );
}
