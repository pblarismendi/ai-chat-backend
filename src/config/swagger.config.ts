import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Chat con IA',
      version: '1.0.0',
      description: 'API REST para una aplicación de chat con inteligencia artificial',
      contact: {
        name: 'Soporte',
        email: 'soporte@aichat.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'], // Rutas a los archivos donde están las anotaciones
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec; 