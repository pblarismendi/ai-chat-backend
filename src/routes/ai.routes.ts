import express from 'express';
import { AIController } from '../controllers/ai.controller';
import { verifyToken } from '../middleware/auth.middleware';

/**
 * @swagger
 * tags:
 *   name: IA
 *   description: Endpoints para interactuar con el modelo de IA
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - content
 *         - role
 *       properties:
 *         content:
 *           type: string
 *           description: Contenido del mensaje
 *         role:
 *           type: string
 *           description: Rol del remitente (user, assistant, system)
 *           enum: [user, assistant, system]
 */

/**
 * @swagger
 * /api/ai/chat:
 *   post:
 *     summary: Enviar mensajes al modelo de IA
 *     tags: [IA]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - messages
 *             properties:
 *               max_tokens:
 *                 type: integer
 *                 description: Número máximo de tokens en la respuesta
 *                 default: 1000
 *               messages:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Message'
 *                 description: Lista de mensajes para enviar al modelo
 *               temperature:
 *                 type: number
 *                 format: float
 *                 minimum: 0
 *                 maximum: 1
 *                 default: 0.7
 *                 description: Temperatura para controlar la aleatoriedad de la respuesta
 *     responses:
 *       200:
 *         description: Respuesta exitosa del modelo de IA
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Datos de solicitud inválidos
 *       401:
 *         description: Token no proporcionado o inválido
 *       500:
 *         description: Error al comunicarse con el modelo de IA o error del servidor
 */

export function getAIRoutes(): express.Router {
  const router = express.Router();
  const aiController = new AIController();

  // Ruta para comunicarse con el modelo de IA
  // Requiere autenticación mediante JWT
  router.post('/chat', verifyToken, aiController.chat);

  return router;
} 