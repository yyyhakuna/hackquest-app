# @hackquest/web

This package contains the main web application for the HackQuest project. It serves as the primary user interface for our platform.

## Overview

The web application includes:

- User authentication and authorization
- Interactive coding challenges
- Leaderboards and user profiles
- Real-time collaboration features
- Integration with our GraphQL API

## Technologies Used

- [Next.js](https://nextjs.org/) 14
- [React](https://reactjs.org/) 18
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GraphQL](https://graphql.org/) (with [GraphQL Code Generator](https://the-guild.dev/graphql/codegen))
- [TanStack Query](https://tanstack.com/query/latest)
- [Framer Motion](https://www.framer.com/motion/)

## Getting Started

To run the web application locally:

1. Navigate to the `apps/web` directory
2. Install dependencies: `pnpm install`
3. Start the development server: `pnpm dev`
4. Open your browser and visit `http://localhost:3000`

## Available Scripts

- `pnpm dev`: Starts the development server
- `pnpm build`: Builds the production application
- `pnpm start`: Runs the production server
- `pnpm type-check`: Runs TypeScript type checking
- `pnpm generate:i18n`: Generates internationalization files
- `pnpm import:i18n`: Imports internationalization data
- `pnpm codegen`: Generates TypeScript types from GraphQL schema

## Contributing

We welcome contributions to improve and expand our web application. If you'd like to add new features, fix bugs, or suggest improvements, please submit a pull request.

## Related Packages

- `@hackquest/ui`: UI component library used in the web app
- `@hackquest/utils`: Shared utility functions
- `@hackquest/tailwind-config`: Shared Tailwind CSS configuration

For more information on the overall project structure and setup, refer to the root-level README.
