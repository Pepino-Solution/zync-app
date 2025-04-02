// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import PrivacyWebhookHandlers from "./privacy.js";

import mongoose from "mongoose";
import promptRoutes from "./prompt.routes.js";

import openaiRoutes from "./openai.routes.js";

import dotenv from "dotenv";
dotenv.config();

// Conecta ao MongoDB local
mongoose.connect("mongodb://localhost:27017/zync");

mongoose.connection.on("connected", () => {
  console.log("[MongoDB] Conectado com sucesso!");
});

mongoose.connection.on("error", (err) => {
  console.error("[MongoDB] Erro de conexão:", err);
});

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10,
);
// end-Conecta ao MongoDB local

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

/** @type {import('express').Application} */
const app = express();
app.use(express.json());

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot(),
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: PrivacyWebhookHandlers }),
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/openai", openaiRoutes);
app.use("/api/prompts", promptRoutes);

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", (req, res, next) => {
  if (!req.query.shop && process.env.NODE_ENV === "development") {
    req.query.shop = process.env.SHOP_URL;
  }
  next();
});

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  res
    .status(200)
    .set("Content-Type", "text/html")
    .send(
      readFileSync(join(STATIC_PATH, "index.html"))
        .toString()
        .replace("%VITE_SHOPIFY_API_KEY%", process.env.SHOPIFY_API_KEY || ""),
    );
});

app.listen(PORT);
