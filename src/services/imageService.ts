// Servicio para la generación de imágenes con Hugging Face

export interface ImageGenerationRequest {
  inputs: string;
}

export interface AdvancedImageSettings {
  width?: number;
  height?: number;
  num_inference_steps?: number;
  guidance_scale?: number;
}

export interface ImageGenerationResponse {
  blob: Blob;
  url: string;
}

class ImageService {
  private readonly baseUrl = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev";
  private readonly apiKey: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_API_KEY;
    if (!this.apiKey) {
      throw new Error('API Key de Hugging Face no encontrada. Verifica tu archivo .env');
    }
  }

  /**
   * Genera una imagen usando la API de Hugging Face
   * @param data - Parámetros para la generación de imagen
   * @returns Promise con la respuesta de la imagen
   */
  async generateImage(data: ImageGenerationRequest): Promise<ImageGenerationResponse> {
    try {
      const response = await fetch(this.baseUrl, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      return {
        blob,
        url,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error al generar imagen: ${error.message}`);
      }
      throw new Error('Error desconocido al generar imagen');
    }
  }

  /**
   * Genera una imagen con parámetros básicos
   * @param prompt - Descripción de la imagen a generar
   * @returns Promise con la respuesta de la imagen
   */
  async generateBasicImage(prompt: string): Promise<ImageGenerationResponse> {
    return this.generateImage({
      inputs: prompt,
    });
  }

  /**
   * Genera una imagen con parámetros avanzados
   * @param prompt - Descripción de la imagen a generar
   * @param _options - Opciones adicionales para la generación (actualmente no soportadas por esta API)
   * @returns Promise con la respuesta de la imagen
   */
  async generateAdvancedImage(
    prompt: string, 
    _options: Partial<AdvancedImageSettings> = {}
  ): Promise<ImageGenerationResponse> {
    // Por ahora, la API básica de Hugging Face solo soporta el prompt
    // Los parámetros adicionales se ignoran pero mantenemos la interfaz para compatibilidad
    return this.generateImage({
      inputs: prompt,
    });
  }

  /**
   * Verifica si la API Key está configurada correctamente
   * @returns boolean indicando si la configuración es válida
   */
  isConfigured(): boolean {
    return !!this.apiKey && this.apiKey.length > 0;
  }
}

// Exportar una instancia singleton del servicio
export const imageService = new ImageService();

// Exportar la clase para testing o instancias personalizadas
export default ImageService;
