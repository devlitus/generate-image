import { Download, Loader2, Sparkles } from 'lucide-react'
import type { GeneratedImage } from '../types'

interface ImageResultProps {
  image: GeneratedImage | null
  isLoading: boolean
  onDownload?: () => void
}

export function ImageResult({ image, isLoading, onDownload }: ImageResultProps) {
  if (isLoading) {
    return (
      <div className="placeholder">
        <Loader2 className="animate-spin placeholder-icon" />
        <p>Generando imagen...</p>
        <small>Esto puede tomar unos momentos</small>
      </div>
    )
  }

  if (image) {
    return (
      <div className="result-section">
        <div className="image-container">
          <img
            src={image.url}
            alt={image.prompt}
            className="generated-image"
          />
          {onDownload && (
            <button
              onClick={onDownload}
              className="download-btn"
              aria-label="Descargar imagen"
            >
              <Download size={20} />
            </button>
          )}
        </div>
        <p className="image-prompt">"{image.prompt}"</p>
      </div>
    )
  }

  return (
    <div className="placeholder">
      <Sparkles className="placeholder-icon" />
      <p>Tu imagen aparecerá aquí</p>
      <small>Configura los parámetros y escribe una descripción para comenzar</small>
    </div>
  )
}
