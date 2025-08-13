import { useState, useEffect } from 'react'
import { Sparkles, Download, Moon, Sun, Loader2, Settings } from 'lucide-react'
import { imageService, type AdvancedImageSettings } from './services/imageService'
import './App.css'

interface GeneratedImage {
  url: string
  prompt: string
  timestamp: number
}

function App() {
  const [prompt, setPrompt] = useState('')
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [advancedSettings, setAdvancedSettings] = useState<Partial<AdvancedImageSettings>>({
    width: 1024,
    height: 1024,
    num_inference_steps: 28,
    guidance_scale: 3.5,
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const generateImage = async () => {
    if (!prompt.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      // Verificar que el servicio esté configurado
      if (!imageService.isConfigured()) {
        throw new Error('API Key no configurada. Verifica tu archivo .env')
      }

      // Generar la imagen usando el servicio con configuraciones avanzadas
      const result = await imageService.generateAdvancedImage(prompt, advancedSettings)

      setGeneratedImage({
        url: result.url,
        prompt,
        timestamp: Date.now()
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setIsLoading(false)
    }
  }

  const downloadImage = () => {
    if (!generatedImage) return

    const link = document.createElement('a')
    link.href = generatedImage.url
    link.download = `generated-image-${generatedImage.timestamp}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      generateImage()
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <Sparkles className="title-icon" />
            Generador de Imágenes AI
          </h1>
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Cambiar tema"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <main className="app-main">
        <div className="main-grid">
          {/* Columna Izquierda - Controles */}
          <div className="left-panel">
            {/* Configuraciones Avanzadas */}
            <div className="settings-panel">
              <div className="settings-header-inline">
                <h3>
                  <Settings size={18} />
                  Configuración Avanzada
                </h3>
              </div>
              
              <div className="settings-grid">
                <div className="setting-group-inline">
                  <label htmlFor="width-inline">Ancho</label>
                  <input
                    id="width-inline"
                    type="number"
                    min="256"
                    max="2048"
                    step="64"
                    value={advancedSettings.width || 1024}
                    onChange={(e) => setAdvancedSettings(prev => ({ ...prev, width: parseInt(e.target.value) }))}
                    className="setting-input-inline"
                    disabled={isLoading}
                  />
                </div>

                <div className="setting-group-inline">
                  <label htmlFor="height-inline">Alto</label>
                  <input
                    id="height-inline"
                    type="number"
                    min="256"
                    max="2048"
                    step="64"
                    value={advancedSettings.height || 1024}
                    onChange={(e) => setAdvancedSettings(prev => ({ ...prev, height: parseInt(e.target.value) }))}
                    className="setting-input-inline"
                    disabled={isLoading}
                  />
                </div>

                <div className="setting-group-inline">
                  <label htmlFor="steps-inline">Pasos</label>
                  <input
                    id="steps-inline"
                    type="number"
                    min="1"
                    max="50"
                    value={advancedSettings.num_inference_steps || 28}
                    onChange={(e) => setAdvancedSettings(prev => ({ ...prev, num_inference_steps: parseInt(e.target.value) }))}
                    className="setting-input-inline"
                    disabled={isLoading}
                  />
                </div>

                <div className="setting-group-inline">
                  <label htmlFor="guidance-inline">Guía</label>
                  <input
                    id="guidance-inline"
                    type="number"
                    min="1"
                    max="20"
                    step="0.5"
                    value={advancedSettings.guidance_scale || 3.5}
                    onChange={(e) => setAdvancedSettings(prev => ({ ...prev, guidance_scale: parseFloat(e.target.value) }))}
                    className="setting-input-inline"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            {/* Área de Prompt */}
            <div className="prompt-section">
              <div className="input-group">
                <label htmlFor="prompt-input" className="prompt-label">
                  Describe tu imagen
                </label>
                <textarea
                  id="prompt-input"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe la imagen que quieres generar..."
                  className="prompt-input"
                  rows={4}
                  disabled={isLoading}
                  style={{ resize: "none" }}
                />
                <button
                  onClick={generateImage}
                  disabled={!prompt.trim() || isLoading}
                  className="generate-btn"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="btn-icon spinning" />
                      Generando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="btn-icon" />
                      Generar Imagen
                    </>
                  )}
                </button>
              </div>
              
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Columna Derecha - Resultado */}
          <div className="right-panel">
            {generatedImage ? (
              <div className="result-section">
                <div className="image-container">
                  <img
                    src={generatedImage.url}
                    alt={generatedImage.prompt}
                    className="generated-image"
                  />
                  <button
                    onClick={downloadImage}
                    className="download-btn"
                    aria-label="Descargar imagen"
                  >
                    <Download size={20} />
                  </button>
                </div>
                <p className="image-prompt">"{generatedImage.prompt}"</p>
              </div>
            ) : (
              <div className="placeholder">
                <Sparkles className="placeholder-icon" />
                <p>Tu imagen aparecerá aquí</p>
                <small>Configura los parámetros y escribe una descripción para comenzar</small>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
