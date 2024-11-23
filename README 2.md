# HackQuest

This is the Monorepo for [HackQuest](https://hackquest.io).

## What's inside?

This Monorepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@hackquest/ui`: a stub React component library shared by both `web` and `docs` applications
- `@hackquest/utils`: shared utilities
- `@hackquest/tailwind-config`: `tailwindcss` configurations
- `@hackquest/typescript-config`: `tsconfig.json` used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Biome](https://biomejs.dev/) for code linting

### Build

To build all apps and packages, run the following command:

```
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm dev
```

## Contributing

We welcome contributions from the community! Here are some guidelines to help you get started:

### How to Contribute

- **Fork the repository**: Start by forking the repository to your GitHub account.
- **Clone your fork**: Clone the forked repository to your local machine using:

```bash
git clone https://github.com/moonshotcommons/hackquest-app.git
```

- **Create a new branch**: It’s important to work on a new branch for each feature or bugfix. Create a new branch with a descriptive name:

```bash
git checkout -b feature/new-feature-name
```

- **Make your changes**: mplement your changes locally. Please follow our code style guidelines (see below).
- **Commit your changes**: Commit your changes with a descriptive commit message:

```bash
git commit -m "feat: new feature"
```

- **Push your changes**: Push your changes to your fork on GitHub:

```bash
git push origin feature/new-feature-name
```

- **Create a Pull Request**: Go to your fork on GitHub and create a Pull Request (PR) for your changes.

### Code Style

We use [Biome](https://biomejs.dev/) for code linting. You can run the following command to check for linting errors:

```bash
pnpm format-and-lint
```

You can also run the following command to automatically fix linting errors:

```bash
pnpm format-and-lint:fix
```

### File Naming Conventions

- Use **kebab-case** for naming files. For example:

  - Good: `my-component.tsx`, `my-feature.ts`
  - Bad: `MyComponent.tsx`, `myFeature.ts`

- Use **kebab-case** for naming directories. For example:

  - Good: `my-component`, `my-feature`
  - Bad: `MyComponent`, `myFeature`

### Reporting Issues

If you encounter any issues or have suggestions for improvements, please [open an issue](https://github.com/moonshotcommons/hackquest-app/issues). Be sure to include as much detail as possible.

Thank you for contributing!

## Useful Links

Learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [GraphQL Documentation](https://graphql.org/learn/)
- [TanStack Query Documentation](https://tanstack.com/query/latest/docs/react/overview)
- [Framer Motion Documentation](https://www.framer.com/motion/)
