module.exports = {
  server: {
    port: process.env.PORT || 3000,
  },
  db: {
    url: 'mongodb://mongodb/',
    mongoDBConfig: {
      useMongoClient: true,
      socketTimeoutMS: 0,
      keepAlive: true,
      reconnectTries: 30,
    },
  },
}
