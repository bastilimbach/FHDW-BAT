module.exports = {
  server: {
    port: process.env.PORT || 3000,
  },
  db: {
    url: process.env.MONGODB_URL || 'mongodb://localhost/', // mongodb_manager - tAB6YHzI'DGCndv~'f&LM7nXqImZtJr{JW7'2S9$rgHGYKeDn29(FR4cy2WwkwPV
    mongoDBConfig: {
      useMongoClient: true,
      socketTimeoutMS: 0,
      keepAlive: true,
      reconnectTries: 30,
    },
  },
}
