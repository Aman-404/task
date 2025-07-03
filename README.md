# Task Manager Pro 📋

A modern, feature-rich task management application built with React, Redux Toolkit, and Material-UI. This application provides comprehensive project management capabilities including Kanban boards, user management, and task tracking.

## ✨ Features

- **User Authentication**: Secure login/logout with JWT tokens
- **Role-based Access Control**: Admin, Manager, and User roles
- **Kanban Board**: Drag-and-drop task management
- **Dashboard Analytics**: Visual insights into project progress
- **Task Management**: Create, update, delete, and track tasks
- **User Management**: Admin panel for user CRUD operations
- **Project & Sprint Management**: Organize work into projects and sprints
- **Dark/Light Theme**: Toggle between themes
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Live synchronization of task changes

## 🛠️ Tech Stack

- **Frontend**: React 18, Redux Toolkit, Material-UI
- **Routing**: React Router DOM
- **State Management**: Redux Toolkit with RTK Query
- **UI Components**: Material-UI, React Bootstrap
- **Form Handling**: React Hook Form with Yup validation
- **Charts**: Recharts
- **Drag & Drop**: React Beautiful DnD
- **Date Handling**: Day.js
- **Animations**: Framer Motion
- **Testing**: Jest, React Testing Library
- **Code Quality**: ESLint, Prettier

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (buttons, inputs, etc.)
│   ├── forms/          # Form components
│   └── layout/         # Layout components (header, sidebar, etc.)
├── features/           # Feature-based modules
│   ├── auth/           # Authentication features
│   ├── dashboard/      # Dashboard components
│   ├── kanban/         # Kanban board features
│   ├── admin/          # Admin panel features
│   ├── users/          # User management
│   └── tasks/          # Task management
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── services/           # API services and HTTP client
├── store/              # Redux store and slices
├── utils/              # Utility functions
├── constants/          # Application constants
├── types/              # Type definitions
├── styles/             # Global styles and themes
├── assets/             # Static assets (images, icons)
└── tests/              # Test files and utilities
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/task-manager-pro.git
   cd task-manager-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration values.

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

### Development
- `npm start` - Starts the development server
- `npm run dev` - Alias for start command

### Building
- `npm run build` - Creates a production build
- `npm run build:analyze` - Builds and analyzes bundle size

### Testing
- `npm test` - Runs the test suite in watch mode
- `npm run test:coverage` - Runs tests with coverage report
- `npm run test:ci` - Runs tests in CI mode

### Code Quality
- `npm run lint` - Lints the codebase
- `npm run lint:fix` - Fixes linting errors automatically
- `npm run format` - Formats code with Prettier
- `npm run type-check` - Runs TypeScript type checking

### Utilities
- `npm run eject` - Ejects from Create React App (⚠️ irreversible)
- `npm run clean` - Cleans build artifacts

## 🏗️ Architecture

### State Management
The application uses Redux Toolkit for state management with the following slices:
- `authSlice` - User authentication state
- `taskSlice` - Task management state
- `userSlice` - User data and management
- `projectSlice` - Project management
- `sprintSlice` - Sprint management

### API Layer
Centralized API client with interceptors for:
- Authentication token management
- Request/response logging
- Error handling
- Request retries

### Component Architecture
Follows a feature-based structure with:
- Reusable UI components
- Feature-specific components
- Custom hooks for business logic
- Context providers for shared state

## 🔧 Configuration

### Environment Variables
Key environment variables (see `.env.example`):

```env
REACT_APP_API_BASE_URL=http://localhost:3001
REACT_APP_ENV=development
REACT_APP_NAME="Task Manager Pro"
```

### Theme Configuration
The application supports dark/light themes configured in:
- `src/styles/theme.js` - Theme definitions
- `src/components/ThemeProvider.jsx` - Theme provider component

## 🧪 Testing

The project includes comprehensive testing setup:

### Unit Tests
- Component testing with React Testing Library
- Hook testing with React Hooks Testing Library
- Utility function tests

### Integration Tests
- API integration tests
- Feature workflow tests
- Redux store tests

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- TaskCard.test.js
```

## 📦 Deployment

### Production Build
```bash
npm run build
```

### Docker Deployment
```bash
# Build Docker image
docker build -t task-manager-pro .

# Run container
docker run -p 3000:3000 task-manager-pro
```

### Environment-specific Builds
```bash
# Staging
REACT_APP_ENV=staging npm run build

# Production
REACT_APP_ENV=production npm run build
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Use conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Email: support@taskmanagerpro.com
- Documentation: [docs.taskmanagerpro.com](https://docs.taskmanagerpro.com)

## 🙏 Acknowledgments

- [Create React App](https://create-react-app.dev/) for the initial setup
- [Material-UI](https://mui.com/) for the component library
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- All contributors and maintainers

---

**Built with ❤️ by the Task Manager Pro Team**
