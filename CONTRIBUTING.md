# Contribution Guide

Welcome to Task Manager Pro! We're excited that you're interested in contributing to our project. This guide will help you get started with contributing code and collaborating with other developers.

## 🎯 Goals

Our contribution process is designed to encourage high-quality contributions and facilitate collaboration among our developer community.

## 🛠 Prerequisites

- Familiarity with React, Redux, and Material-UI
- Node.js and npm installed on your machine
- A GitHub account

## 🚀 Getting Started

### 1. Fork the Repository

- Navigate to the main repository: [Task Manager Pro](https://github.com/your-username/task-manager-pro)
- Click on the "Fork" button in the upper right corner

### 2. Clone Your Fork

```bash
# Clone the repository
git clone https://github.com/your-username/task-manager-pro.git
cd task-manager-pro
```

### 3. Set Upstream

This will allow you to keep your fork up to date with the original repository.

```bash
git remote add upstream https://github.com/original-username/task-manager-pro.git
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Set Up Environment Variables

- Copy the `.env.example` to `.env`
- Modify any necessary configurations

```bash
cp .env.example .env
```

## 📦 Development Workflow

1. **Create a Branch**

Always create a new branch for your changes and use a descriptive name:

```bash
git checkout -b feature/my-new-feature
```

2. **Make Changes**

- Follow the existing code style
- Ensure all tests are passing
- Write new tests for your code

3. **Commit Changes**

- Write concise and descriptive commit messages:

```bash
git add .
git commit -m "Add new feature to ..."
```

4. **Push Your Branch**

```bash
git push origin feature/my-new-feature
```

5. **Create a Pull Request**

- Navigate to your fork on GitHub
- Click the "Compare & pull request" button
- Write a clear description for your PR
- Link any related issues or discussions

## 🔍 Code Review Process

1. **Automated Checks**
   - Ensure all automated checks pass (CI/CD, linters, etc.)

2. **Peer Review**
   - Your PR will be reviewed by team members
   - Be open to feedback and iterate on your code

3. **Merge**
   - Once approved, your PR will be merged into the main branch

## 🧪 Writing Tests

- We use Jest and React Testing Library for testing.
- Write unit tests for all new features and components.
- Run tests locally before pushing:

```bash
npm test
```

## 🧹 Code Quality

Maintain code quality by following these guidelines:
- Utilize ESLint for linting
- Use Prettier for code formatting
- Adhere to our style guide
- Use PropTypes for component validation

## 🤝 Communication

- Join our community on Discord or Slack
- Attend weekly developer meetings
- Contribute to discussions in GitHub issues

## 🙏 Thank You!

Thank you for your contributions! Your support and dedication make Task Manager Pro better for everyone. Happy coding!
