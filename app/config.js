module.exports = {
  server: {
    port: process.env.PORT || 3000,
  },
  db: {
    // url: process.env.MONGODB_URL || 'mongodb://localhost/', // mongodb_manager - tAB6YHzI'DGCndv~'f&LM7nXqImZtJr{JW7'2S9$rgHGYKeDn29(FR4cy2WwkwPV
    url: 'mongodb://mongodb_manager:tAB6YHzI\'DGCndv%7E\'f&LM7nXqImZtJr%7BJW7\'2S9%24rgHGYKeDn29(FR4cy2WwkwPV@35.197.211.150/admin?replicaSet=rs0',
    // url: 'mongodb://35.197.211.150/admin',
    mongoDBConfig: {
      useMongoClient: true,
      socketTimeoutMS: 0,
      keepAlive: true,
      reconnectTries: 30,
    },
  },
  adminToken: 'sebastian',
}
