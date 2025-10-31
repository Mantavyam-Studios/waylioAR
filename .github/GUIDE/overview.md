# Overview

This project is a production-grade turborepo template for Next.js apps. It is designed to be a comprehensive starting point for new apps, providing a solid, opinionated foundation with a minimal amount of configuration.

# Structure (/docs/structure)

This Project is a monorepo, which means it contains multiple packages in a single repository. This is a common pattern for modern web applications, as it allows you to share code between different parts of the application, and manage them all together.

The monorepo is managed by Turborepo, which is a tool for managing monorepos. It provides a simple way to manage multiple packages in a single repository, and is designed to work with modern web applications.

```
├── apps
│   ├── api
│   ├── app
│   ├── docs
│   ├── email
│   ├── storybook
│   ├── studio
│   └── web
├── packages
│   ├── ai
│   ├── analytics
│   ├── auth
│   ├── cms
│   ├── collaboration
│   ├── database
│   ├── design-system
│   ├── email
│   ├── feature-flags
│   ├── internationalization
│   ├── next-config
│   ├── notifications
│   ├── observability
│   ├── payments
│   ├── rate-limit
│   ├── security
│   ├── seo
│   ├── storage
│   ├── typescript-config
│   └── webhooks
├── scripts
└── turbo
    └── generators
```

## Apps

This Project contains a number of apps that make up your project. Each app is a self-contained application that can be deployed independently.

While you can choose to run these apps on the subdomain of your choice, the recommended subdomains are listed on each page. Remember to add them to your [environment variables](/docs/setup/env) under `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_WEB_URL`, and `NEXT_PUBLIC_DOCS_URL`.

Each app should be self-contained and not depend on other apps. They should have an `env.ts` file at the root of the app that composes the environment variables from the packages it depends on.

### API (/apps/api)

<Tip>
  The 

  `api`

   application runs on port 3002. We recommend deploying it to 

  `api.{yourdomain}.com`

  .
</Tip>

This Project exports the API from the `apps/api` directory. It is designed to be run separately from the main app, and is used to run isolate functions that are not part of the main user-facing application e.g. webhooks, cron jobs, etc.

#### Overview

The API is designed to run serverless functions, and is not intended to be used as a traditional Node.js server. However, it is designed to be as flexible as possible, and you can switch to running a traditional server if you need to.

Functionally speaking, splitting the API from the main app doesn't matter if you're running these projects on Vercel. Serverless functions are all independent pieces of infrastructure and can scale independently. However, having it run independently provides a dedicated endpoint for non-web applications e.g. mobile apps, smart home devices, etc.

#### Features

* **Cron jobs**: The API is used to run [cron jobs](/packages/cron). These are defined in the `apps/api/app/cron` directory. Each cron job is a `.ts` file that exports a route handler.
* **Webhooks**: The API is used to run [inbound webhooks](/packages/webhooks/inbound). These are defined in the `apps/api/app/webhooks` directory. Each webhook is a `.ts` file that exports a route handler.

### App (/apps/app)

This Project exports the main app from the `apps/app` directory. It is designed to be run on a subdomain of your choice, and is used to run the main user-facing application.

#### Overview

The `app` application is the main user-facing application built on [Next.js](https://nextjs.org). It is designed to be a starting point for your own unique projects, containing all the core functionality you need.

#### Features

* **Design System**: The app is connected to the [Design System](/packages/design-system/components) and includes a variety of components, hooks, and utilities to help you get started.
* **Authentication**: The app includes a fully-featured [authentication system](/packages/authentication) with support for email login. You can easily extend it to support other providers and authentication methods. The app is also broken into authenticated and unauthenticated route groups.
* **Database**: The app is connected to the [Database](/packages/database) and can fetch data in React Server Components.
* **Collaboration**: The app is connected to the [Collaboration](/packages/collaboration) and contains Avatar Stack and Live Cursor components.

### Documentation (/apps/docs)

This Project uses [Mintlify](https://mintlify.com) to generate beautiful docs. Each page is a `.mdx` file, written in Markdown, with built-in UI components and API playground.

#### Creating a new page

To create a new documentation page, add a new MDX file to the `apps/docs` directory. The file name will be used as the slug for the page and the frontmatter will be used to generate the docs page. For example:

```mdx title="apps/docs/hello-world.mdx"
---
title: 'Quickstart'
description: 'Start building modern documentation in under five minutes.'
---
```

Learn more supported [meta tags](https://mintlify.com/docs/page).

#### Adding a page to the navigation

To add a page to the sidebar, you'll need to define it in the `mint.json` file in the `apps/docs` directory. From the previous example, here's how you can add it to the sidebar:

```mdx title="mint.json {2-5}"
"navigation": [
  {
    "group": "Getting Started",
    "pages": ["hello-world"]
  },
  {
    // ...
  }
]
```

### Email (/apps/email)

<Tip>
  The 

  `email`

   application runs on port 3003.
</Tip>

This Project comes with [`react.email`](https://react.email/) built in, allowing you to create and send beautiful emails using React and TypeScript.

`react.email` has a preview server, so you can preview the emails templates in the browser.

To preview the emails templates, simply run the `email` app:

```sh title="Terminal"
pnpm dev --filter email
```

### Storybook (/apps/storybook)

<Tip>
  The 

  `storybook`

   application runs on port 6006.
</Tip>

This Project uses [Storybook](https://storybook.js.org/) as a frontend workshop for the design system. It allows you to interact with the components in the design system, and see how they behave in different states.

#### Configuration

By default, Storybook is configured with every component from [shadcn/ui](https://ui.shadcn.com/), and allows you to interact with them. It is also configured with the relevant fonts and higher-order components to ensure a consistent experience between your application and Storybook.

#### Running the workshop

Storybook will start automatically when you run `pnpm dev`. You can also start it independently with `pnpm dev --filter storybook`. The preview will be available at [localhost:6006](http://localhost:6006).

#### Adding stories

You can add your own components to the workshop by adding them to the `apps/storybook/stories` directory. Each component should have its own `.stories.tsx` file.

### Studio (/apps/studio)

<Tip>
  The 

  `studio`

   application runs on port 3005.
</Tip>

This Project includes Prisma Studio, which is a visual editor for your database. To start it, run the following command:

```sh title="Terminal"
pnpm dev --filter studio
```

### Web (/apps/web)


<Tip>
  The 

  `web`

   application runs on port 3001. We recommend deploying it to 

  `www.{yourdomain}.com`

  .
</Tip>

This Project comes with a default website application, which is located in the `apps/web` folder.

#### Overview

It's built on Next.js and Tailwind CSS, with some example pages scaffolded using [TWBlocks](https://www.twblocks.com/). It's designed for you to customize and extend to your needs, whether that means keeping the default pages or replacing them with your own.

#### Features

* **Design System**: The app is connected to the [Design System](/packages/design-system/components) and includes a variety of components, hooks, and utilities to help you get started.
* **CMS**: The app is connected to the [CMS](/packages/cms/overview) package to power your type-safe blog.
* **SEO**: The app is connected to the [SEO](/packages/seo/metadata) package which optimizes the site for search engines.
* **Analytics**: The app is connected to the [Analytics](/packages/analytics/product) package to track visitor behavior.
* **Observability**: The app is connected to the [Observability](/packages/observability/error-capture) package to track errors and performance.


## Packages

This Project contains a number of shared packages that are used across the monorepo. The purpose of these packages is to isolate shared code from the main app, making it easier to manage and update.

Additionally, it makes it easier to swap out parts of the app for different implementations. For example, the `database` package contains everything related to the database, including the schema and migrations. This allows us to easily swap out the database provider or ORM without impacting other parts of the app.

Each package should be self-contained and not depend on other packages. They should export everything that is needed by the app — middleware, hooks, components and even the [environment variables](/docs/setup/env).

All Packages basic documentation is available at web URL = https://www.next-forge.com/packages/ and few core packages details are provided below:

### Authentication (/packages/authentication)

This Project manages authentication through the use of a `auth` package. By default, this package is a wrapper around [Clerk](https://clerk.com/) which provides a complete authentication and user management solution that integrates seamlessly with Next.js applications.

#### In-App

The `@repo/auth` package exposes an `AuthProvider`, however you don't need to use this directly. The [`DesignSystemProvider`](/packages/design-system/provider) includes all relevant providers and higher-order components.

From here, you can use all the pre-built components and hooks provided by Clerk. To demonstrate this, we've added the `<OrganizationSwitcher>` and `<UserButton>` components to the sidebar, as well as built out the Sign In and Sign Up pages.

#### Webhooks

Clerk uses webhooks to handle authentication events and you can send these to your application. Read more about [inbound authentication webhooks](/packages/webhooks/inbound#authentication-events).

#### Email Templates

Clerk handles authentication and authorization emails automatically. You can configure the theming of Clerk-sent emails in their dashboard.

##### Local Development

Currently there's no way to easily test Clerk webhooks locally, so you'll have to test them in a staging environment. This means deploying your app to a "production" state Vercel project with development environment variables e.g. `staging-api.example.com`. Then you can add this URL to your Clerk project's webhook settings.

### Database (/packages/database)

This Project aims to provide a robust, type-safe database client that makes it easy to work with your database while maintaining strong typing throughout your application. We aim to support tooling that:

* Provide a declarative way to define your database schema
* Generate type-safe database client
* Handle database migrations
* Offer powerful query capabilities with full TypeScript support

#### Default Configuration

By default, This Project uses [Neon](https://neon.tech) as its database provider and [Prisma](https://prisma.io) as its ORM. However, you can easily switch to other providers if you'd prefer, for example:

* You can use other ORMs like [Drizzle](/migrations/database/drizzle), Kysely or any other type-safe ORM.
* You can use other database providers like [PlanetScale](/migrations/database/planetscale), [Prisma Postgres](/migrations/database/prisma-postgres), [Supabase](/migrations/database/supabase), [EdgeDB](/migrations/database/edgedb), or any other PostgreSQL/MySQL provider.

#### Usage

Database and ORM configuration is located in `@repo/database`. You can import this package into any server-side component, like so:

```tsx title="page.tsx {1,4}"
import { database } from '@repo/database';

const Page = async () => {
  const users = await database.user.findMany();

  // Do something with users!
}
```

#### Schema Definition

The database schema is defined in `packages/database/prisma/schema.prisma`. This schema file uses Prisma's schema definition language to describe your database tables, relationships, and types.

##### Adding a new model

Let's say we want to add a new model called `Post`, describing a blog post. The blog content will be in a JSON format, generated by a library like [Tiptap](https://tiptap.dev/). To do this, we would add the following to your schema:

```prisma title="packages/database/prisma/schema.prisma {1-7}"
model Post {
  id        String   @id @default(cuid())
  title     String
  content   Json
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

##### Deploying changes

To deploy your schema changes, run the following command:

```sh title="Terminal"
pnpm migrate
```

This runs the following commands:

* `npx prisma format` to format the schema file
* `npx prisma generate` to generate the Prisma client
* `npx prisma db push` to push the schema changes to the database

#### Visual database editor

This Project includes a [visual database editor](/apps/studio) that allows you to view and edit your database records.


### Cron Jobs (/packages/cron)

By default, This Project uses Vercel's cron jobs feature to trigger Next.js serverless functions on a schedule. However, you can replace this setup with the background job service of your choosing, such as trigger.dev or BetterStack.

#### Writing functions

Next.js serverless functions act as the basis for scheduled jobs. You can write them in any runtime and trigger them using a simple HTTP call.

To demonstrate, we've created a example endpoint called `keep-alive` that creates, then subsequently deletes, a temporary `page` object in the database. This is a little workaround to prevent databases going to sleep after a period of inactivity. You should probably remove this if you don't need it.

Additionally, while you can add cron jobs to any app, we use the `api` app to keep our background jobs, webhooks and other such tasks isolated from our UI.

You can add new functions by creating the relevant `route.ts` files in the `apps/api/app/cron` folder. While you can put them anywhere, we use the aptly named `cron` folder to hold our endpoints designed to run as cron jobs. For example:

```ts title="apps/api/app/cron/[your-function]/route.ts"
import { database } from '@repo/database';

// Must use GET for Vercel cron jobs
export const GET = async () => {
  // Do stuff

  return new Response('OK', { status: 200 });
};
```

#### Scheduling functions

After you write your serverless function, you can schedule it by amending the `vercel.json` file in the API app. To serve as an example, we've wired up the `keep-alive` job mentioned above to run every 10 minutes.

```json title="apps/api/vercel.json"
{
  "crons": [
    {
      "path": "/cron/keep-alive",
      "schedule": "0 1 * * *"
    }
  ]
}
```

#### How Vercel triggers cron jobs

To trigger a cron job, Vercel makes an HTTP GET request to your project's production deployment URL, using the path provided in your project's vercel.json file. For example, Vercel might make a request to:

```
https://*.vercel.app/cron/keep-alive
```

#### Triggering functions manually

Should you need to trigger a cron job manually, you can either do so in the Vercel dashboard or just hit the endpoint with a standard HTTP request. For example:

```sh title="Terminal"
curl -X GET http://localhost:3002/cron/keep-alive
```

### Transactional Emails (/packages/email)

We use [Resend](https://resend.com/) to send transactional emails. The templates, located in `@repo/email`, are powered by [React Email](https://react.email/) - a collection of high-quality, unstyled components for creating beautiful emails using React and TypeScript.

#### Sending Emails

To send an email, you can use the `resend` object, which is imported from the `@repo/email` package:

```tsx title="apps/web/app/contact/actions/contact.tsx"
import { resend } from '@repo/email';

await resend.emails.send({
  from: 'sender@acme.com',
  to: 'recipient@acme.com',
  subject: 'The email subject',
  text: 'The email text',
});
```

##### Email Templates

The `email` package is separated from the app folder for two reasons:

1. We can import the templates into the `email` app, allowing for previewing them in the UI; and
2. We can import both the templates and the SDK into our other apps and use them to send emails.

Resend and React Email play nicely together. For example, here's how you can send a transactional email using a React email template:

```tsx title="apps/web/app/contact/actions/contact.tsx"
import { resend } from '@repo/email';
import { ContactTemplate } from '@repo/email/templates/contact';

await resend.emails.send({
  from: 'sender@acme.com',
  to: 'recipient@acme.com',
  subject: 'The email subject',
  react: <ContactTemplate name={name} email={email} message={message} />,
});
```

#### Previewing Emails

To preview the emails templates, simply run the [`email` app](/apps/email).

### Formatting (/packages/formatting)

This Project uses [Ultracite](https://ultracite.dev) for code formatting and linting. Ultracite is a preconfigured setup of [Biome](https://biomejs.dev), a high-performance Rust-based toolchain which includes a formatter, linter, and more for JavaScript and TypeScript.

#### Benefits

Ultracite provides several benefits:

* Zero configuration required - works out of the box
* Extremely fast performance
* Consistent code style across your project
* Built-in linting rules
* TypeScript support

#### Usage

The formatter and linter are automatically configured in your project and will run on save. If you want to manually run them across your project, you can run the following commands:

* `pnpm lint` - This will check all files across all apps and packages.
* `pnpm format` - This will check and fix all files across all apps and packages.


### Notifications (/packages/notifications)

This Project offers a notifications package that allows you to send in-app notifications to your users. By default, it uses [Knock](https://knock.app/), a cross-channel notification platform that supports in-app, email, SMS, push, and chat notifications. Knock allows you to centralize your notification logic and templates in one place and [orchestrate complex workflows](https://docs.knock.app/designing-workflows/overview) with things like branching, batching, throttling, delays, and conditional sending.

#### Setup

To use the notifications package, you need to add the required environment variables to your project, as specified in the `packages/notifications/keys.ts` file.

#### In-app notifications feed

To render an in-app notifications feed, import the `NotificationsTrigger` component from the `@repo/notifications` package and use it in your app. We've already added this to the sidebar in the example app:

```tsx title="apps/app/app/(authenticated)/components/sidebar.tsx"
import { NotificationsTrigger } from '@repo/notifications/components/trigger';

<NotificationsTrigger>
  <Button variant="ghost" size="icon" className="shrink-0">
    <BellIcon size={16} className="text-muted-foreground" />
  </Button>
</NotificationsTrigger>
```

Pressing the button will open the in-app notifications feed, which displays all of the notifications for the current user.

#### Send a notification

Knock sends notifications using workflows. To send an in-app notification, create a new [workflow](https://docs.knock.app/concepts/workflows) in the Knock dashboard that uses the [`in-app` channel provider](https://docs.knock.app/integrations/in-app/knock) and create a corresponding message template.

Then you can [trigger that workflow](https://docs.knock.app/send-notifications/triggering-workflows) for a particular user in your app, passing in the necessary data to populate the message template:

```tsx title="notify.ts"
import { notifications } from '@repo/notifications';

await notifications.workflows.trigger('workflow-key', {
  recipients: [{
    id: 'user-id',
    email: 'user-email',
  }],
  data: {
    message: 'Hello, world!',
  },
});
```

#### Multi-channel notifications

Using Knock, you can add additional channel providers to your workflow to send notifications via email, SMS, push, or chat. To do this, create a new [channel provider](https://docs.knock.app/integrations) in the Knock dashboard, follow any configuration instructions for that provider, and add it to your workflow as a channel step.


## Boundaries

This Project uses [Turborepo's boundaries](https://turborepo.com/docs/reference/boundaries) to ensure that Turborepo features work correctly by checking for package manager Workspace violations.

You can run `pnpm run boundaries` to check for any violations.

## Package Manager

This Project defaults to using [pnpm](https://pnpm.io/) as a package manager, but you can use [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/) or [bun](https://bun.sh/) instead by passing a flag during the [installation](/docs/setup/installation) step.

## Mintlify CLI

We use the [Mintlify CLI](https://mintlify.com/docs/development) to preview the [docs](/apps/docs) locally.

## Accounts

This Project relies on various SaaS products. You will need to create accounts with the following services then set the API keys in your [environment variables](/docs/setup/env):

* [Arcjet](https://arcjet.com), for [application security](/packages/security/application).
* [BetterStack](https://betterstack.com), for [logging](/packages/observability/logging) and [uptime monitoring](/packages/observability/uptime).
* [Clerk](https://clerk.com), for [authentication](/packages/authentication).
* [Google Analytics](https://developers.google.com/analytics), for [web analytics](/packages/analytics/web).
* [Posthog](https://posthog.com), for [product analytics](/packages/analytics/product).
* [Resend](https://resend.com), for [transactional emails](/packages/email).
* [Sentry](https://sentry.io), for [error tracking](/packages/observability/error-capture).

## Database

You will need to scaffold the database using the schema defined in `packages/database/prisma/schema.prisma`:

```bash
pnpm run migrate
```

For more details on the default Prisma configuration (using Neon), refer to the [Database Configuration Guide](https://www.This Project.com/packages/database#default-configuration).

## CMS

You will need to setup the CMS. Follow the instructions [here](/packages/cms/overview), but the summary is:

1. Fork the [`basehub/This Project`](https://basehub.com/basehub/This Project?fork=1) template
2. Get your Read Token from the "Connect to Your App" page
3. Add the `BASEHUB_TOKEN` to your [Environment Variables](/docs/setup/env)

## Development

Run the development server with:

```bash
    pnpm run dev
```

Open the localhost URLs with the relevant ports listed above to see the app, e.g.

* [http://localhost:3000/](http://localhost:3000/) — The main app.
* [http://localhost:3001/](http://localhost:3001/) — The website.
* [http://localhost:3002/](http://localhost:3002/) — The API.
* [http://localhost:3003/](http://localhost:3003/) — Email preview server.
* [http://localhost:3004/](http://localhost:3004/) — The docs

# Environment Variables (/docs/setup/env)

This Project uses environment variables for configuration. This guide will help you set up the required variables to get started quickly, and optionally configure additional features.

## Quick Start (Minimum Setup)

To get This Project running locally with basic functionality, you only need to configure these **required** variables:

### 1. Database (Required)

Add to `packages/database/.env`:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```

<Tip>
  For quick local development, we recommend [Neon](https://neon.tech) for a free PostgreSQL database. Sign up, create a project, and copy the connection string.
</Tip>

### 2. Authentication (Required)

Add to `apps/app/.env.local` and `apps/web/.env.local`:

```bash
# Server
CLERK_SECRET_KEY="sk_test_..."

# Client
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"
```

<Steps>
  <Step>
    Sign up at [Clerk](https://clerk.com) and create an application
  </Step>

  <Step>
    Go to **API Keys** in your Clerk dashboard
  </Step>

  <Step>
    Copy the **Publishable key** (starts with `pk_`) and **Secret key** (starts with `sk_`)
  </Step>
</Steps>

### 3. Local URLs (Pre-configured)

These are already set to sensible defaults for local development:

```bash
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_WEB_URL="http://localhost:3001"
NEXT_PUBLIC_API_URL="http://localhost:3002"
NEXT_PUBLIC_DOCS_URL="http://localhost:3004"
VERCEL_PROJECT_PRODUCTION_URL="http://localhost:3000"
```

**That's it!** You can now run `npm run dev` and the app will work with basic authentication and database functionality.

## Optional Features

The following environment variables enable additional features. You can add them as needed:

### Content Management (BaseHub)

Required for the CMS functionality in `packages/cms`.

```bash
BASEHUB_TOKEN="bshb_..."
```

<Steps>
  <Step>
    Fork the [This Project template](https://basehub.com/basehub/This Project?fork=1) on BaseHub
  </Step>

  <Step>
    Navigate to **Settings → API Tokens**
  </Step>

  <Step>
    Copy your **Read Token** (starts with `bshb_`)
  </Step>
</Steps>

### Email (Resend)

Required for sending transactional emails.

```bash
RESEND_TOKEN="re_..."
RESEND_FROM="noreply@yourdomain.com"
```

[Get your API key from Resend](https://resend.com/api-keys)

### Payments (Stripe)

Required for subscription and payment functionality.

```bash
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

<Steps>
  <Step>
    Get your keys from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
  </Step>

  <Step>
    For webhooks, install the [Stripe CLI](https://stripe.com/docs/stripe-cli) and run:

    ```bash
    stripe listen --forward-to localhost:3000/api/webhooks/stripe
    ```
  </Step>
</Steps>

### Analytics

#### Google Analytics

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-..."
```

[Create a GA4 property](https://analytics.google.com/)

#### PostHog

```bash
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"
```

[Get your keys from PostHog](https://app.posthog.com/project/settings)

### Observability

#### Better Stack (Uptime monitoring)

```bash
BETTERSTACK_API_KEY="..."
BETTERSTACK_URL="..."
```

[Get your API key from Better Stack](https://betterstack.com/logs)

### Security

#### Arcjet (Rate limiting & security)

```bash
ARCJET_KEY="ajkey_..."
```

[Get your key from Arcjet](https://app.arcjet.com/)

### Real-time Features

#### Liveblocks (Collaboration)

```bash
LIVEBLOCKS_SECRET="sk_..."
```

[Get your secret from Liveblocks](https://liveblocks.io/dashboard)

### Notifications (Knock)

```bash
KNOCK_API_KEY="..."
KNOCK_SECRET_API_KEY="..."
KNOCK_FEED_CHANNEL_ID="..."
NEXT_PUBLIC_KNOCK_API_KEY="..."
NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID="..."
```

[Get your keys from Knock](https://dashboard.knock.app/)

### Feature Flags

```bash
FLAGS_SECRET="..."
```

Generate a random secret string for encrypting feature flag data.

### Webhooks (Svix)

```bash
SVIX_TOKEN="..."
```

[Get your token from Svix](https://dashboard.svix.com/)

### Clerk Webhooks

```bash
CLERK_WEBHOOK_SECRET="whsec_..."
```

<Steps>
  <Step>
    In your Clerk dashboard, go to **Webhooks**
  </Step>

  <Step>
    Add a new endpoint pointing to `https://your-domain.com/api/webhooks/clerk`
  </Step>

  <Step>
    Subscribe to the events you need (typically `user.created`, `user.updated`, etc.)
  </Step>

  <Step>
    Copy the **Signing Secret**
  </Step>
</Steps>

## Environment Variable Files

This Project uses environment variables across multiple locations:

| File                                       | Purpose                     |
| ------------------------------------------ | --------------------------- |
| `apps/app/.env.local`                      | Main application variables  |
| `apps/web/.env.local`                      | Marketing website variables |
| `apps/api/.env.local`                      | API server variables        |
| `packages/database/.env`                   | Database connection string  |
| `packages/cms/.env.local`                  | CMS configuration           |
| `packages/internationalization/.env.local` | i18n configuration          |

<Info>
  The setup script automatically creates these files from `.env.example` templates. You only need to fill in the values.
</Info>

## Type Safety

Type safety is provided by [@t3-oss/env-nextjs](https://env.t3.gg/), which provides runtime validation and autocompletion for all environment variables. Each package defines its own environment variables in a `keys.ts` file with Zod validation schemas.

### Validation Rules

<Tip>
  Be as specific as possible with validation. For example, if a vendor secret starts with `sec_`, validate it as `z.string().min(1).startsWith('sec_')`. This makes your intent clearer and helps prevent errors at runtime.
</Tip>

## Adding a New Environment Variable

To add a new environment variable:

1. Add the variable to the relevant `.env.local` files
2. Add validation to the `server` or `client` object in the package's `keys.ts` file

Example in `packages/my-package/keys.ts`:

```ts
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const keys = createEnv({
  server: {
    MY_NEW_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_MY_VALUE: z.string().optional(),
  },
  runtimeEnv: {
    MY_NEW_SECRET: process.env.MY_NEW_SECRET,
    NEXT_PUBLIC_MY_VALUE: process.env.NEXT_PUBLIC_MY_VALUE,
  },
});
```

## Deployment

When deploying to Vercel or other platforms:

1. Add all required environment variables to your deployment platform
2. Update URL variables (`NEXT_PUBLIC_APP_URL`, etc.) to production values
3. Some integrations (like Sentry) automatically inject their variables via marketplace integrations

<Info>
  Variables prefixed with `VERCEL_` are automatically available in Vercel deployments, such as `VERCEL_PROJECT_PRODUCTION_URL`.
</Info>
