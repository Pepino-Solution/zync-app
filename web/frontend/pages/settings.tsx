//Polaris
import { Page } from "@shopify/polaris";
//Shopify App Bridge
import { TitleBar } from "@shopify/app-bridge-react";
//i18n
import { useTranslation } from "react-i18next";

export default function Settings() {
  const { t } = useTranslation();
  return (
    <Page>
      <TitleBar title={t("Settings.title")}></TitleBar>
    </Page>
  );
}
