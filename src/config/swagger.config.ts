// src/config/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description: 'This is an API documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['../routes/**/*.ts'],
};

export const swaggerSpec = swaggerJSDoc({
  ...options,
  apis: [__dirname.replace('/config', '/routes') + '/**/*.ts'],
});
