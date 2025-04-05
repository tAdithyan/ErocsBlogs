import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0', // Correct OpenAPI version
    info: {
      title: 'Bookify API',
      version: '1.0.0', // Your API version
      description: 'API documentation for Bookify API.',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/api`,
        // url: ` https://erocsblogs.onrender.com/api`,

       
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // List of files to scan for additional routes or schemas
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
