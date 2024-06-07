const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Students API',
    description: 'A simple API built using Express and MongoDB that demonstrates security best practices.'
  },
  host: 'student-api-ydrp.onrender.com',
  schemes: [
    "https"
  ],
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);