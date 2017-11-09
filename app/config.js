module.exports = {
  server: {
    domain: process.env.DOMAIN || 'gcp.sebastianlimbach.com',
    port: 3000,
  },
  db: {
    url: process.env.MONGODB_URL || 'mongodb://localhost/',
    mongoDBConfig: {
      useMongoClient: true,
      socketTimeoutMS: 0,
      keepAlive: true,
      reconnectTries: 30,
    },
  },
  adminToken: process.env.API_ADMIN_TOKEN || 'sebastian',
}
