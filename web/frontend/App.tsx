/// <reference types="vite/client" />
import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";

import { QueryProvider, PolarisProvider } from "./components";

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.glob("./pages/**/!(*.test.[jt]sx)*.([jt]sx)", {
    eager: true,
  }) as Record<string, { default: React.ComponentType<any> }>;
  const { t } = useTranslation();

  return (
    <PolarisProvider>
      <BrowserRouter>
        <QueryProvider>
          <NavMenu>
            <a href="/" rel="home" />
            <a href="/insights">{t("NavigationMenu.insights")}</a>
            <a href="/transcriptions">{t("NavigationMenu.transcriptions")}</a>
            <a href="/analytics">{t("NavigationMenu.analytics")}</a>
            <a href="/settings">{t("NavigationMenu.settings")}</a>
          </NavMenu>
          <Routes pages={pages} />
        </QueryProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
