import dotenv from 'dotenv';

dotenv.config();

export const options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_SCHEMA,
  dialect: 'mysql',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  migrationStorageTableNAme: 'migrations'
}

export default {
  development:options,
  test:options,
  production:options,
}
