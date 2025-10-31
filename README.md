# Overview

Waylio is a complete SAAS Solution for Hospitals redefining experiences with AR navigation and seamless digital organisation management.

# Structure (/docs/structure)

This Project is a monorepo, which means it contains multiple packages in a single repository. This is a common pattern for modern web applications, as it allows you to share code between different parts of the application, and manage them all together. It is created using a production-grade turborepo template for Next.js apps. It is designed to be a comprehensive starting point for new apps, providing a solid, opinionated foundation with a minimal amount of configuration.

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

## TECH STACK

| Component | Technology |
| :---- | :---- |
| Monorepo | Turborepo |
| Mobile App (Patient) | Kotlin (Android) / Swift (iOS) |
| Web Dashboards (Admin, Doctor, Staff) | Next.js 14+ (App Router) |
| Backend API | Next.js Serverless Functions |
| Hosting | Vercel |
| Database | Neon (PostgreSQL) |
| ORM | Prisma |
| Authentication | Clerk |
| Real-time Notifications (Queues, Alerts) | Knock |
| Payments (P1 & P4) | Stripe |
| Transactional Emails | Resend |
| AR Navigation (P3) | Multiset AI |
| Security & Rate Limiting | Arcjet |
| Observability (Logging & Errors) | BetterStack & Sentry |
| Analytics | Google Analytics & Posthog |

## Apps

This Project contains a number of apps that make up your project. Each app is a self-contained application that can be deployed independently.

While you can choose to run these apps on the subdomain of your choice, the recommended subdomains are listed on each page. Remember to add them to your [environment variables](/docs/setup/env) under `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_WEB_URL`, and `NEXT_PUBLIC_DOCS_URL`.

Each app should be self-contained and not depend on other apps. They should have an `env.ts` file at the root of the app that composes the environment variables from the packages it depends on.

## Packages

This Project contains a number of shared packages that are used across the monorepo. The purpose of these packages is to isolate shared code from the main app, making it easier to manage and update.

Additionally, it makes it easier to swap out parts of the app for different implementations. For example, the `database` package contains everything related to the database, including the schema and migrations. This allows us to easily swap out the database provider or ORM without impacting other parts of the app.

Each package should be self-contained and not depend on other packages. They should export everything that is needed by the app — middleware, hooks, components and even the [environment variables](/docs/setup/env).

All Packages basic documentation is available at web URL = https://www.next-forge.com/packages 

More Detailed Documentation for Apps and Packages are available at this directory lcoation : waylio/.github/GUIDE/overview.md