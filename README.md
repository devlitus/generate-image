# 🎨 Generador de Imágenes AI

Generador de imágenes moderno y minimalista construido con React + TypeScript + Vite. Utiliza el modelo FLUX.1-dev de Hugging Face para generar imágenes de alta calidad a partir de descripciones de texto.

## ✨ Características

- **🎨 Interfaz moderna y minimalista** - Diseño limpio y fácil de usar
- **🌙 Modo oscuro/claro** - Cambia entre temas con un clic
- **📱 Completamente responsive** - Se adapta a cualquier dispositivo
- **⚙️ Configuración avanzada** - Ajusta dimensiones, pasos de inferencia y escala de guía
- **💬 Editor de prompts intuitivo** - Textarea con contador de caracteres
- **🖼️ Visualización y descarga** - Ve y descarga tus imágenes generadas
- **🚀 Integración con Hugging Face** - Utiliza el modelo FLUX.1-dev
- **⚡ Generación rápida** - Interfaz optimizada con estados de carga

## 🖥️ Interfaz de Usuario

La aplicación cuenta con un diseño de dos paneles:
- **Panel izquierdo**: Configuración avanzada y editor de prompts
- **Panel derecho**: Visualización de la imagen generada

## 🚀 Instalación y Configuración

1. **Clona el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd generate_image
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Configura tu API Key de Hugging Face**:
   
   Crea un archivo `.env` en la raíz del proyecto:
   ```env
   VITE_API_KEY="tu_api_key_de_huggingface"
   ```
   
   > 💡 **Obtén tu API Key**: Ve a [Hugging Face Settings](https://huggingface.co/settings/tokens) y crea un nuevo token.

4. **Inicia el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

5. **Abre la aplicación**:
   
   Visita [http://localhost:5173](http://localhost:5173) en tu navegador.

## 🛠️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter de código

## 📁 Estructura del Proyecto

```
generate_image/
├── public/
│   └── vite.svg
├── src/
│   ├── components/          # Componentes React
│   │   ├── AdvancedSettingsInline.tsx
│   │   ├── Header.tsx
│   │   ├── ImageResult.tsx
│   │   └── PromptInput.tsx
│   ├── hooks/              # Custom hooks
│   │   ├── useImageGeneration.ts
│   │   └── useTheme.ts
│   ├── services/           # Servicios de API
│   │   └── imageService.ts
│   ├── styles/             # Estilos CSS
│   │   ├── App.css
│   │   ├── globals.css
│   │   └── components/
│   ├── types/              # Definiciones de tipos
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env                    # Variables de entorno
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🔧 Personalización

### Cambiar el Modelo de IA

Puedes modificar el modelo utilizado editando el archivo `src/services/imageService.ts`:

```typescript
private readonly baseUrl = "https://api-inference.huggingface.co/models/tu-modelo-preferido";
```

### Ajustar Configuraciones por Defecto

Modifica los valores por defecto en `src/App.tsx`:

```typescript
const [advancedSettings, setAdvancedSettings] = useState<Partial<AdvancedImageSettings>>({
  width: 1024,
  height: 1024,
  num_inference_steps: 28,
  guidance_scale: 3.5,
})
```

## 🛡️ Tecnologías Utilizadas

- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Vite** - Herramienta de construcción rápida
- **Hugging Face API** - Servicio de generación de imágenes
- **Lucide React** - Biblioteca de iconos
- **CSS Modules** - Estilos modulares

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [Hugging Face](https://huggingface.co/) por proporcionar la API de generación de imágenes
- [Black Forest Labs](https://blackforestlabs.ai/) por el modelo FLUX.1-dev
- [Lucide](https://lucide.dev/) por los iconos

---

**Hecho con ❤️ y mucho café ☕**
