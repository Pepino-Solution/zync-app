import { Page } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";

export default function Insights() {
  const { t } = useTranslation();
  return (
    <Page>
      <TitleBar title={t("Insights.title")}></TitleBar>
    </Page>
  );
}
