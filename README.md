# Zync App Shopify

This is the documentation to help you run the Zync App in development mode.

## Tech Stack

This template combines a number of third party open-source tools:

- [Express](https://expressjs.com/) builds the backend.
- [Vite](https://vitejs.dev/) builds the [React](https://reactjs.org/) frontend.
- [React Router](https://reactrouter.com/) is used for routing. We wrap this with file-based routing.
- [React Query](https://react-query.tanstack.com/) queries the Admin API.
- [`i18next`](https://www.i18next.com/) and related libraries are used to internationalize the frontend.
  - [`react-i18next`](https://react.i18next.com/) is used for React-specific i18n functionality.
  - [`i18next-resources-to-backend`](https://github.com/i18next/i18next-resources-to-backend) is used to dynamically load app translations.
  - [`@formatjs/intl-localematcher`](https://formatjs.io/docs/polyfills/intl-localematcher/) is used to match the user locale with supported app locales.
  - [`@formatjs/intl-locale`](https://formatjs.io/docs/polyfills/intl-locale) is used as a polyfill for [`Intl.Locale`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale) if necessary.
  - [`@formatjs/intl-pluralrules`](https://formatjs.io/docs/polyfills/intl-pluralrules) is used as a polyfill for [`Intl.PluralRules`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules) if necessary.
- [MongoDB](https://www.mongodb.com/) database.

The following Shopify tools complement these third-party tools to ease app development:

- [Shopify API library](https://github.com/Shopify/shopify-node-api) adds OAuth to the Express backend. This lets users install the app and grant scope permissions.
- [App Bridge React](https://shopify.dev/docs/apps/tools/app-bridge/getting-started/using-react) adds [authentication to API requests](https://shopify.dev/docs/api/app-bridge-library/apis/resource-fetching) in the frontend and renders components outside of the App’s iFrame.
- [Polaris React](https://polaris.shopify.com/) is a powerful design system and component library that helps developers build high quality, consistent experiences for Shopify merchants.
- [File-based routing](https://github.com/Shopify/shopify-frontend-template-react/blob/main/Routes.jsx) makes creating new pages easier.
- [`@shopify/i18next-shopify`](https://github.com/Shopify/i18next-shopify) is a plugin for [`i18next`](https://www.i18next.com/) that allows translation files to follow the same JSON schema used by Shopify [app extensions](https://shopify.dev/docs/apps/checkout/best-practices/localizing-ui-extensions#how-it-works) and [themes](https://shopify.dev/docs/themes/architecture/locales/storefront-locale-files#usage).

## Getting started

### Requirements

1. You must [download and install Node.js](https://nodejs.org/en/download/) if you don't already have it.
1. You must [create a Shopify partner account](https://partners.shopify.com/signup) if you don’t have one.
1. You must create a store for testing if you don't have one, either a [development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) or a [Shopify Plus sandbox store](https://help.shopify.com/en/partners/dashboard/managing-stores/plus-sandbox-store).
1. You must have an account on [Vap.ai](https://vapi.ai/).
1. You must have installed the [MongoDB Community Server Download](https://www.mongodb.com/try/download/community).
1. You need to have an account on [Plataform Openai](https://platform.openai.com/).

### Steps before starting

1. Create an app manually in your Shopify Partners account.

### Populate the variables

1. Go to the application created in Shopify Partners, get the ClientID and replace it in the shopify.app.toml file
1. Go to the web folder, transform the file .env.example env .env and fill it with the indicated variables.
1. Go to the frontend folder, transform the .env.example file to .env and fill it with the indicated variables.

### Install dependencies

This template can be installed using your preferred package manager.

You must run these commands in the project root, in the web folder and in the frontend folder.

Using yarn:

```shell
yarn isntall
```

Using npm:

```shell
npm install
```

Using pnpm:

```shell
pnpm install
```

This will clone the template and install the required dependencies.

#### Local Development

[The Shopify CLI](https://shopify.dev/docs/apps/tools/cli) connects to an app in your Partners dashboard. It provides environment variables, runs commands in parallel, and updates application URLs for easier development.

You can develop locally using your preferred package manager. Run one of the following commands from the root of your app.

Running the Clean command before Dev will prevent errors.

Using yarn:

```shell
yarn clean
yarn dev
```

Using npm:

```shell
npm run clean
npm run dev
```

Using pnpm:

```shell
pnpm run clean
pnpm run dev
```

Open the URL generated in your console. Once you grant permission to the app, you can start development.

## Developer resources

- [Introduction to Shopify apps](https://shopify.dev/docs/apps/getting-started)
- [App authentication](https://shopify.dev/docs/apps/auth)
- [Shopify CLI](https://shopify.dev/docs/apps/tools/cli)
- [Shopify API Library documentation](https://github.com/Shopify/shopify-api-js#readme)
- [Getting started with internationalizing your app](https://shopify.dev/docs/apps/best-practices/internationalization/getting-started)
  - [i18next](https://www.i18next.com/)
    - [Configuration options](https://www.i18next.com/overview/configuration-options)
  - [react-i18next](https://react.i18next.com/)
    - [`useTranslation` hook](https://react.i18next.com/latest/usetranslation-hook)
    - [`Trans` component usage with components array](https://react.i18next.com/latest/trans-component#alternative-usage-components-array)
  - [i18n-ally VS Code extension](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally)
