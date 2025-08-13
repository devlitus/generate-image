import { useState } from 'react'
import { Settings, X } from 'lucide-react'
import type { AdvancedImageSettings } from '../services/imageService'

interface AdvancedSettingsProps {
  isOpen: boolean
  onClose: () => void
  settings: Partial<AdvancedImageSettings>
  onSettingsChange: (settings: Partial<AdvancedImageSettings>) => void
}

export default function AdvancedSettings({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
}: AdvancedSettingsProps) {
  const [localSettings, setLocalSettings] = useState<Partial<AdvancedImageSettings>>(settings)

  const handleSave = () => {
    onSettingsChange(localSettings)
    onClose()
  }

  const handleReset = () => {
    const defaultSettings: Partial<AdvancedImageSettings> = {
      width: 1024,
      height: 1024,
      num_inference_steps: 28,
      guidance_scale: 3.5,
    }
    setLocalSettings(defaultSettings)
  }

  const updateSetting = (key: keyof AdvancedImageSettings, value: string | number) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  if (!isOpen) return null

  return (
    <div className="settings-overlay">
      <div className="settings-modal">
        <div className="settings-header">
          <h3>
            <Settings size={20} />
            Configuración Avanzada
          </h3>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <div className="settings-content">
          <div className="setting-group">
            <label htmlFor="width">Ancho (px)</label>
            <input
              id="width"
              type="number"
              min="256"
              max="2048"
              step="64"
              value={localSettings?.width || 1024}
              onChange={(e) => updateSetting('width', parseInt(e.target.value))}
              className="setting-input"
            />
          </div>

          <div className="setting-group">
            <label htmlFor="height">Alto (px)</label>
            <input
              id="height"
              type="number"
              min="256"
              max="2048"
              step="64"
              value={localSettings?.height || 1024}
              onChange={(e) => updateSetting('height', parseInt(e.target.value))}
              className="setting-input"
            />
          </div>

          <div className="setting-group">
            <label htmlFor="steps">Pasos de inferencia</label>
            <input
              id="steps"
              type="number"
              min="1"
              max="50"
              value={localSettings?.num_inference_steps || 28}
              onChange={(e) => updateSetting('num_inference_steps', parseInt(e.target.value))}
              className="setting-input"
            />
            <small>Mayor número = mejor calidad pero más lento</small>
          </div>

          <div className="setting-group">
            <label htmlFor="guidance">Escala de guía</label>
            <input
              id="guidance"
              type="number"
              min="1"
              max="20"
              step="0.5"
              value={localSettings?.guidance_scale || 3.5}
              onChange={(e) => updateSetting('guidance_scale', parseFloat(e.target.value))}
              className="setting-input"
            />
            <small>Qué tan estrictamente seguir el prompt</small>
          </div>
        </div>

        <div className="settings-footer">
          <button onClick={handleReset} className="reset-btn">
            Restablecer
          </button>
          <div className="footer-actions">
            <button onClick={onClose} className="cancel-btn">
              Cancelar
            </button>
            <button onClick={handleSave} className="save-btn">
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
