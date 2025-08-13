import { useState } from 'react'
import { imageService, type AdvancedImageSettings } from '../services/imageService'
import type { GeneratedImage } from '../types'

export function useImageGeneration() {
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateImage = async (prompt: string, settings: Partial<AdvancedImageSettings>) => {
    if (!prompt.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      if (!imageService.isConfigured()) {
        throw new Error('API Key no configurada. Verifica tu archivo .env')
      }

      const result = await imageService.generateAdvancedImage(prompt, settings)

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

  return {
    generatedImage,
    isLoading,
    error,
    generateImage,
    downloadImage
  }
}
