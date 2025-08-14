import { useState } from 'react'
import type { AdvancedImageSettings } from './services/imageService'
import Header from './components/Header'
import AdvancedSettingsInline from './components/AdvancedSettingsInline'
import PromptInput from './components/PromptInput'
import { ImageResult } from './components/ImageResult'
import { useImageGeneration } from './hooks/useImageGeneration'
import { useTheme } from './hooks/useTheme'
import './styles/globals.css'
import './styles/App.css'

function App() {
  const [prompt, setPrompt] = useState('')
  const [advancedSettings, setAdvancedSettings] = useState<Partial<AdvancedImageSettings>>({
    width: 1024,
    height: 1024,
    num_inference_steps: 28,
    guidance_scale: 3.5,
  })

  const { darkMode, toggleTheme } = useTheme()
  const { generatedImage, isLoading, error, generateImage, downloadImage } = useImageGeneration()

  const handleGenerate = () => {
    generateImage(prompt, advancedSettings)
  }

  const handleClearPrompt = () => {
    setPrompt('')
  }

  return (
    <div className="app" >
      <Header darkMode={darkMode} onToggleTheme={toggleTheme} />

      <main className="app-main">
        <div className="main-grid">
          {/* Columna Izquierda - Controles */}
          <div className="left-panel">
            <AdvancedSettingsInline
              settings={advancedSettings}
              onSettingsChange={setAdvancedSettings}
              isLoading={isLoading}
            />

            <PromptInput
              prompt={prompt}
              onPromptChange={setPrompt}
              onGenerate={handleGenerate}
              onClear={handleClearPrompt}
              isLoading={isLoading}
              error={error}
            />
          </div>

          {/* Columna Derecha - Resultado */}
          <div className="right-panel">
            <ImageResult
              image={generatedImage}
              isLoading={isLoading}
              onDownload={() => downloadImage()}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
