//Polaris
import { Page } from "@shopify/polaris";
//Shopify App Bridge
import { TitleBar } from "@shopify/app-bridge-react";
//i18n
import { useTranslation } from "react-i18next";

export default function Analytics() {
  const { t } = useTranslation();
  return (
    <Page>
      <TitleBar title={t("Analytics.title")}></TitleBar>
    </Page>
  );
}
