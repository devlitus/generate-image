import { Sparkles, Loader2, AlertCircle } from 'lucide-react'
import '../styles/components/PromptInput.css'

interface PromptInputProps {
  prompt: string
  onPromptChange: (prompt: string) => void
  onGenerate: () => void
  onClear: () => void
  isLoading: boolean
  error: string | null
}

export default function PromptInput({ 
  prompt, 
  onPromptChange, 
  onGenerate, 
  onClear, 
  isLoading, 
  error 
}: PromptInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onGenerate()
    }
  }

  return (
    <div className="prompt-section">
      <div className="input-group">
        <label htmlFor="prompt-input" className="prompt-label">
          Describe tu imagen
        </label>
        <textarea
          id="prompt-input"
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Describe la imagen que quieres generar..."
          className="prompt-input"
          rows={4}
          disabled={isLoading}
          style={{ resize: "none" }}
        />
        <div className="button-group">
          <button
            onClick={onGenerate}
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
          <button
            onClick={onClear}
            disabled={!prompt.trim() || isLoading}
            className="clear-btn"
            aria-label="Limpiar texto"
          >
            Limpiar
          </button>
        </div>
      </div>
      
      {error && (
        <div className="error-message">
          <AlertCircle size={16} />
          {error}
        </div>
      )}
    </div>
  )
}
