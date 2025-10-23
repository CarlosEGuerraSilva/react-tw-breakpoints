# Changelog

All notable changes to react-tw-breakpoints will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.8] - 2025-10-22

### Added

- Export `StaticBreakpointContainer` and component props for external use
- `useBreakpoint` helper hooks and comprehensive tests
- ESLint and Prettier configuration for code quality
- VSCode settings for Prettier formatting integration
- Guidelines for code changes and file management in `CONTRIBUTING.md`
- SSR-safe documentation for media query utilities
- Deep package documentation

### Changed

- Refactored media query and breakpoint logic for better performance and maintainability
- Renamed hooks to kebab-case convention and updated imports
- Updated linting and formatting configuration
- Refactored entire codebase to use consistent single quotes
- Refactored tests to use single quotes and consistent formatting
- Reformatted Vitest configuration and setup files
- Updated npm scripts for improved testing and publishing workflows
- Refactored npm publish workflow with integrated lint and test jobs
- Updated code examples in documentation to use single quotes

### Fixed

- Warning block formatting in `CONTRIBUTING.md`

## [1.2.4] - 2025-10-22

### Added

- Vitest configuration and setup files for testing environment
- Comprehensive testing documentation in `TESTING.md`
- Full test suite in `src/__tests__/`:
  - Unit tests
  - Hook tests
  - Component tests
- Vitest and Testing Library dependencies in `package.json`

### Changed

- Updated `package.json` with Vitest and Testing Library dependencies
- Updated `package-lock.json` to reflect new testing dependencies

## [1.2.3] - 2025-10-20

### Added

- Project SVG asset (`project.svg`) with branded visual identity
- SSR utility functions for environment checks
- Comprehensive project documentation:
  - `AGENTS.md` for code style and SSR guidelines
  - `CODE_OF_CONDUCT.md`
  - `CONTRIBUTING.md`
  - `LICENSE`
- JSDoc comments for improved code documentation
- Publishing workflow configuration

### Changed

- Revamped `project.svg` with new color scheme and filters
- Refactored SSR checks to use ssr-utils helpers
- Updated `README.md` with project badges, contribution instructions, and license information
- Improved code documentation and clarity

### Removed

- `.npmignore` file (optimized package distribution)

## [1.0.1] - 2025-09-13

### Added

- Container and Grid components for responsive layouts
- Container breakpoint hook for detecting component container breakpoints
- Resize observer store for tracking element size changes
- VSCode tasks for building the package

### Changed

- Refactored breakpoints hooks to use `mediaQueryStore` for better state management

## [1.0.0] - 2025-09-06

### Added

- Initial breakpoints and hooks implementation
- Core functionality for Tailwind CSS breakpoint detection and management
