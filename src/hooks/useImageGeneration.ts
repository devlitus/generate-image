import { useState } from 'react'
import { imageService, type AdvancedImageSettings } from '../services/imageService'
import type { GeneratedImage } from '../types'

// Función para procesar y mejorar mensajes de error
function processErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.'
  }

  const errorMessage = error.message.toLowerCase()

  // Error de créditos excedidos
  if (errorMessage.includes('exceeded') && errorMessage.includes('credits')) {
    return '🔒 Se han agotado los créditos mensuales de la API. Es necesario suscribirse al plan PRO para continuar generando imágenes.'
  }

  // Error de API key
  if (errorMessage.includes('api key') || errorMessage.includes('unauthorized') || errorMessage.includes('401')) {
    return '🔑 La clave de API no es válida o no está configurada. Verifica tu archivo .env'
  }

  // Error de límite de velocidad
  if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
    return '⏱️ Se ha alcanzado el límite de velocidad de la API. Espera unos momentos antes de intentar nuevamente.'
  }

  // Error de servidor
  if (errorMessage.includes('500') || errorMessage.includes('internal server')) {
    return '🔧 El servidor está experimentando problemas temporales. Inténtalo nuevamente en unos minutos.'
  }

  // Error de red
  if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
    return '🌐 Error de conexión. Verifica tu conexión a Internet e inténtalo nuevamente.'
  }

  // Error de timeout
  if (errorMessage.includes('timeout')) {
    return '⏳ La solicitud tardó demasiado tiempo. Inténtalo nuevamente con una descripción más simple.'
  }

  // Error genérico pero limpio
  const cleanMessage = error.message
    .replace(/Error \d+:/g, '') // Remover códigos de error
    .replace(/\{"error":"([^"]+)"\}/g, '$1') // Extraer mensaje del JSON
    .replace(/^Error al generar imagen:\s*/i, '') // Remover prefijo redundante
    .trim()

  return cleanMessage || 'Ha ocurrido un error al generar la imagen. Por favor, inténtalo de nuevo.'
}

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
      setError(processErrorMessage(err))
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
