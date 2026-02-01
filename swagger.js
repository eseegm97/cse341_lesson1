const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API that allows the user to pull from a database of contact info',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes/contactsRoute.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);