import { Page } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";

export default function Analytics() {
  const { t } = useTranslation();
  return (
    <Page>
      <TitleBar title={t("Analytics.title")}></TitleBar>
    </Page>
  );
}
