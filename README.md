# Generador de Imágenes AI

Generador de imágenes minimalista, intuitivo y con modo oscuro, construido con React + Vite. Permite generar imágenes usando modelos de Hugging Face y ajustar parámetros avanzados de generación.

## 🚀 Características

- **UI minimalista y moderna**
- **Modo oscuro/claro**
- **Responsive**: se adapta a cualquier dispositivo
- **Panel de opciones avanzadas**: ancho, alto, pasos de inferencia, escala de guía
- **Textarea para prompt**
- **Visualización y descarga de la imagen generada**
- **Integración con Hugging Face API**

## 🖥️ Vista de la aplicación

- Panel izquierdo: opciones avanzadas y prompt
- Panel derecho: imagen generada

## ⚡ Instalación y uso

1. Clona el repositorio:
   ```bash
   git clone <url-del-repo>
   cd generate_image
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` en la raíz con tu API key de Hugging Face:
   ```env
   VITE_API_KEY="tu_api_key_de_huggingface"
   ```
4. Inicia la app:
   ```bash
   npm run dev
   ```
5. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## 🛠️ Personalización

- Puedes cambiar el modelo de Hugging Face en `src/services/imageService.ts`.
- Los parámetros avanzados se pueden ajustar desde la UI.

## 📦 Estructura del proyecto

```
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── AdvancedSettings.tsx
│   ├── services/
│   │   └── imageService.ts
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── .env
├── package.json
├── vite.config.ts
└── README.md
```

## 🧑‍💻 Tecnologías
- React 19
- Vite
- TypeScript
- Hugging Face API
- Lucide React (iconos)

## 📄 Licencia
MIT

---

Hecho con ❤️ por tu equipo de desarrollo.

# React + TypeScript + Vite

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
