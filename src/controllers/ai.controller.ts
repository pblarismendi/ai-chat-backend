import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const AI_BASE_URL = process.env.AI_BASE_URL || 'http://localhost:1234/v1';

// Interfaz para los mensajes recibidos del cliente
interface Message {
  content: string;
  role: string;
}

// Interfaz para la solicitud recibida del cliente
interface ChatRequest {
  max_tokens: number;
  messages: Message[];
  temperature: number;
}

export class AIController {
  // Método para comunicarse con el modelo de IA
  chat = async (req: Request, res: Response): Promise<void> => {
    try {
      const { max_tokens, messages, temperature } = req.body as ChatRequest;

      // Validar que se proporcionen los datos necesarios
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        res.status(400).json({ message: 'Se requiere al menos un mensaje' });
        return;
      }

      // Validar que cada mensaje tenga content y role
      const invalidMessage = messages.find(msg => !msg.content || !msg.role);
      if (invalidMessage) {
        res.status(400).json({ message: 'Todos los mensajes deben tener content y role' });
        return;
      }

      // Realizar la solicitud al modelo de IA
      const response = await axios.post(`${AI_BASE_URL}/chat/completions`, {
        max_tokens: max_tokens || 1000,
        messages,
        temperature: temperature || 0.7
      });

      // Devolver la respuesta del modelo
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error al comunicarse con el modelo de IA:', error);
      
      if (axios.isAxiosError(error)) {
        // Si el error es de axios, proporcionar detalles específicos
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || 'Error al comunicarse con el modelo de IA';
        
        res.status(status).json({ 
          message,
          error: error.message
        });
      } else {
        // Error general
        res.status(500).json({ message: 'Error del servidor' });
      }
    }
  };
} 