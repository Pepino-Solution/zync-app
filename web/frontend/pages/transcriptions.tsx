//Polaris
import { Page } from "@shopify/polaris";
//Shopify App Bridge
import { TitleBar } from "@shopify/app-bridge-react";
//i18n
import { useTranslation } from "react-i18next";

export default function Transcriptions() {
  const { t } = useTranslation();

  return (
    <Page>
      <TitleBar title={t("Transcriptions.title")}></TitleBar>
    </Page>
  );
}
