import { Settings } from 'lucide-react'
import type { AdvancedImageSettings } from '../services/imageService'
import '../styles/components/AdvancedSettings.css'

interface AdvancedSettingsInlineProps {
  settings: Partial<AdvancedImageSettings>
  onSettingsChange: (settings: Partial<AdvancedImageSettings>) => void
  isLoading: boolean
}

export default function AdvancedSettingsInline({ 
  settings, 
  onSettingsChange, 
  isLoading 
}: AdvancedSettingsInlineProps) {
  const updateSetting = (key: keyof AdvancedImageSettings, value: number) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    })
  }

  return (
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
            value={settings.width || 1024}
            onChange={(e) => updateSetting('width', parseInt(e.target.value))}
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
            value={settings.height || 1024}
            onChange={(e) => updateSetting('height', parseInt(e.target.value))}
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
            value={settings.num_inference_steps || 28}
            onChange={(e) => updateSetting('num_inference_steps', parseInt(e.target.value))}
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
            value={settings.guidance_scale || 3.5}
            onChange={(e) => updateSetting('guidance_scale', parseFloat(e.target.value))}
            className="setting-input-inline"
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
