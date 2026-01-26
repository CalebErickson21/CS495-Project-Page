# Frontend Information
This `README.md` file provides all the information necessary about setup and running the frontend for the **Strata OS** project page.

## Setup
This frontend is created using `Vite`, `React`, and `Tailwind CSS`. We chose to avoid using `Next.js` because it's not as lightweight as `React.js` and for the current state of the project page, we do not have a backend and only need basic routing, so `Next.js` provides a lot of unnecessary overhead.

### Quick Start (For Team Members)
> **Important:** If you are cloning this repo after the initial setup is complete, follow these steps:

1. Navigate to the project directory:
```sh
cd project-page/frontend
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

That's it! Your local development environment will be ready.

### Setup Documentation (For Initial Setup Only)
> **Important:** The instructions below are for documentation purposes only. These steps were used during the initial setup of the repository. If you are setting up your local environment, please use the **Quick Start** instructions above instead.

The following section documents how the project was initially configured. Only the first person setting up the repository needs to follow these steps once. After the initial setup is pushed to GitHub, all team members should use the **Quick Start** instructions above.

In your project's root directory, run:
```sh
npm create vite@latest frontend -- --template react-ts
```

When prompted:
- Select **No** to rolldown vite
- Select **Yes** to install with npm
- Select **Yes** to start now

Now, install dependencies and run:
```sh
cd frontend/
npm install
npm run dev
```
You will see the boilerplate code spin up in your web broswer's **localhost**.

After this, we need to remove any boilerplate code so we can start from scratch.
   - `src/index.css` (delete file contents - clear file, but don't delete)
   - `src/App.css` (delete file)
   - `src/App.tsx` (delete file)
   - Delete any images in the `./public` directory
   - `index.html` (update the `<title>` tag)
   - `main.tsx` Replace the `<App/>` component with ***Hello, World!*** text and remove the import as needed

### Tailwind Setup
2. Install Tailwind CSS (v3)
Navigate into the project folder and run:

```sh
npm install -D tailwindcss@3.4.1 postcss autoprefixer
npx tailwindcss init -p
```
This will:
- Install Tailwind CSS and its PostCSS dependencies
- Generate tailwind.config.js
- Generate postcss.config.js

3. Configure Tailwind
Edit `tailwind.config.js`
Update the content array to include your source files:
```js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
    extend: {},
    },
    plugins: [],
};
```

Edit `src/index.css`
Replace the contents of `src/index.css` with the Tailwind directives:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Ensure `postcss.config.js` looks like this
```js
export default {
    plugins: {
    tailwindcss: {},
    autoprefixer: {},
    },
};
```

## Development Environment
To start the development environment, run:
```sh
npm run dev
```
This will start the app in your web browser's **localhost preview**.

---

## React + TypeScript + Vite Template README

> **Note:** The below documentation is the boilerplate README.md file installed automatically. We have kept it's contents for documentation purposes only. You can disregard for setup purposes.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
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
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
