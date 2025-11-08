

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node
# User Management Application

A modern user management system built with React, TypeScript, and Tailwind CSS. Features include CRUD operations, filtering, column visibility, and a responsive UI. This project uses JSON Server for mock API in development and seamlessly falls back to localStorage for data persistence when deployed (no backend required on Vercel).

---

## 🚀 Live Demo

**[View Deployed App](https://user-management-yai4.vercel.app/)**
*(Update this link after deploying on Vercel)*

---

## ✨ Features

- Full CRUD user management
- Multi-country selection with search
- Responsive modern design (works on mobile and desktop)
- Real-time search and country filter
- Column visibility toggling
- Persistent data with localStorage (on deployment)
- Professional UI using Tailwind CSS and shadcn/ui
- Toast notifications for user feedback

---

## 🛠️ Tech Stack

- React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- Lucide React icons
- Vite
- JSON Server (development, mock API)
- localStorage (for live demo)

---

## ⚡ Quick Start

### 1. Clone & Install


>>>>>>> 993ede4119c36bfe9b106bf066630808f54a7817
Screenshots :
![ListPage](./assets/ListPage.png)
![AddUser](./assets/AddUser.png)
![EditPage](./assets/EditUser.png)
![ViewPage](./assets/ViewPage.png)


