const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API that allows the user to pull from a database of contact info',
    },
    host: process.env.SWAGGER_HOST || 'localhost:3000',
    basePath: '/contacts',
    schemes: process.env.SWAGGER_SCHEME ? [process.env.SWAGGER_SCHEME] : ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes/contactsRoute.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);