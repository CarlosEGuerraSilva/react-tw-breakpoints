# Contributing to the Project

Thank you for your interest in contributing to this project! We're excited to have your help in making it better.

> [!WARNING]
> **Before starting work on any new features or major changes, please open an issue first to discuss your proposal and get approval.** We don't want you to waste time on work that might not align with the project's direction or get merged.

## Commit Conventions

Use conventional commit messages with the appropriate scope:

### Valid commit examples:

```
feat(hook): add new hook feature
fix(hook): fix hook bug
feat(component): add new component feature
fix(component): fix component bug
chore(package): update dependencies
docs: update documentation
```

### Message structure:

- **feat**: For new features
- **fix**: For bug fixes
- **chore**: For changes that don't affect the code (dependencies, tools, etc.)
- **docs**: For documentation changes
- **scope**: Indicates the project part affected (hook, component, package, etc.)

## Package dependencies

We aim to keep dependencies minimal and lightweight. When proposing new dependencies, please consider the following:

- Is the dependency essential for the feature?
- Does it have a small footprint?
- Is it well-maintained and widely used?
- Could the functionality be implemented without adding a new dependency?

> [!WARNING]
> **PRs that introduce new dependencies without strong justification may be rejected to maintain the project's integrity and performance, especially in light of recent NPM security concerns.**

## Steps to Contribute

1. Fork the repository
2. Create a branch for your feature (`git checkout -b feature/my-feature`)
3. Make your changes
4. Run linting and format checks:
   ```bash
   npm run lint
   npm run format
   npm run type-check
   ```
5. Run tests and ensure they pass:
   ```bash
   npm run test:run
   npm run test:coverage
   ```
6. Commit with conventional messages (`git commit -m "feat(hook): add new hook feature"`)
7. Push to the branch (`git push origin feature/my-feature`)
8. Open a Pull Request

## Code Quality Requirements

Before submitting a PR, ensure your code meets the following requirements:

### Linting and Formatting

```bash
npm run lint        # Check for linting errors
npm run lint:fix    # Fix linting errors automatically
npm run format      # Format code with Prettier
```

### Type Checking

```bash
npm run type-check  # Verify TypeScript types
```

### Testing

```bash
npm run test        # Run tests in watch mode
npm run test:run    # Run tests once
npm run test:coverage  # Generate coverage report
```

All tests must pass and maintain or improve code coverage before your PR can be merged.

### Build Verification

```bash
npm run build       # Ensure the package builds successfully
```

## Generated code

This project has a combination of manually maintained code and AI-generated code. When contributing, please ensure that any AI-generated code is reviewed and tested thoroughly to maintain quality and consistency. Also make sure your AI-generated code follows our [AGENTS.md](AGENTS.md) guidelines.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it to understand the expected behavior and how to report any issues.

## License

This project is licensed under the MIT License. By contributing, you agree that your contributions will be licensed under the same license. See the [LICENSE](LICENSE) file for more details.

## Any Questions?

If you have any questions or need further clarification, feel free to open an issue or [send an email](mailto:osp.carlosedgusi@hotmail.com?subject=rtb@question). Thank you for helping to improve this project!
