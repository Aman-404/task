# Project Directory Structure Documentation

This document provides an overview of the directories and files in the Task Manager Pro project, explaining their purpose and how to use them.

## 📂 Root Directory

- **package.json**
  - Contains metadata about the project, scripts, and dependencies.
  - Update dependencies using `npm install <package-name>`.

- **package-lock.json**
  - Automatically generated for describing the exact npm dependency tree.

- **.env/example**
  - Environment variable template.
  - Copy to `.env` and modify for your configuration.

- **.gitignore**
  - Specifies files and directories to be ignored by Git.

- **README.md**
  - Main documentation and getting started guide.

- **CONTRIBUTING.md**
  - Contribution guidelines for developers.

- **Dockerfile**
  - Configuration for Docker container builds.

- **nginx.conf**
  - Nginx web server configuration.

- **.eslintrc.js**
  - ESLint configuration for linting JavaScript and TypeScript files.

- **.prettierrc**
  - Prettier configuration for code formatting.

## 📂 Public Directory

- Contains static assets and the `index.html` template for the React app.

## 📂 Src Directory

- **src/assets/**
  - Contains static files like images and fonts.

- **src/components/**
  - Reusable UI components.
  - Subdirectories for `ui/`, `forms/`, and `layout/`.

- **src/constants/**
  - Centralized application constants.

- **src/features/**
  - Feature-specific modules such as `auth`, `dashboard`, `kanban`.

- **src/hooks/**
  - Custom React hooks for reusable logic.

- **src/pages/**
  - High-level page components that compose feature components.

- **src/services/**
  - API services and HTTP client.

- **src/store/**
  - Redux store setup with slices for state management.

- **src/styles/**
  - Global styles and theme configurations.

- **src/types/**
  - Type definitions and validation schemas.

- **src/utils/**
  - General utility functions for common operations.

## 📂 Tests Directory

- **tests/**
  - Contains test files and utilities for automated tests.
  - Separate folders for `components` and `utils` tests.

## 📂 Docs Directory

- **docs/**
  - Contains additional documentation, including detailed guides and changelogs.

## 🎯 Usage Tips

1. **Adding Dependencies:**
   - Use `npm install <package-name>` to add new dependencies. This updates `package.json` and `package-lock.json`.

2. **Coding Best Practices:**
   - Follow ESLint and Prettier rules for code consistency.
   - Use constants from `src/constants` to avoid magic numbers/strings.

3. **Creating Features:**
   - Add new features under `src/features/`.
   - Create reusable components in `src/components/`.

4. **Working with Styles:**
   - Maintain styles in `src/styles/` for consistent theming.
   - Use Material-UI for component styling.

5. **Testing:**
   - Write tests in the `tests/` directory.
   - Use Jest and React Testing Library for unit testing.

6. **Version Control:**
   - Use Git for version control, adhering to branch naming conventions.
   - Use meaningful commit messages following conventional commits.

This structure and set of guidelines ensure the project remains clean, scalable, and easy to maintain. Happy coding!
