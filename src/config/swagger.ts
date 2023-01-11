export default {
  definition: {
    openapi: '3.0.2',
    info: {
      title: 'Warszawa GTFS API',
      version: '1.0.0',
      contact: {
        name: 'Aliaksei Radkevich',
        url: 'https://github.com/van1757',
      },
    },
  },
  apis: [
    '**/routes/*.js',
    '**/routes/*.ts',
  ],
};
