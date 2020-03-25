const MONGO_USER = process.env.MONGO_USER || 'devUser';
// mongoUser: process.env.MONGO_USER || 'mongoadmin',
// mongoHost: process.env.MONGO_HOST || 'localhost',
// mongoDatabase: process.env.MONGO_DB || 'mongo_0',
// mongoPassword: process.env.MONGO_PASSWORD || 'password',
// mongoPort: process.env.MONGO_PORT || 27017,
const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
const MONGO_NAME = process.env.MONGO_DB || 'room_book_db';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'devSecretPassword';
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_SEED_PATH = process.env.SEED_PATH || '../../mocks/mongo/data.json';
// const DB = `mongodb://localhost:${MONGO_PORT}/${MONGO_NAME}`;
const DB = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}`;
// const DB_SEED = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}`;
// const DB_SEED = `mongodb://${'mongoadmin'}:${'example'}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}`;

module.exports = {
  MONGO_USER,
  MONGO_HOST,
  MONGO_NAME,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_SEED_PATH,
  DB
};
