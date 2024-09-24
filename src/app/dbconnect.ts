import { Sequelize } from 'sequelize'
import { SequelizeOptions } from 'sequelize-typescript'
import { options } from '../../database/config/config.mjs'

const dbOptions = <SequelizeOptions>options;
dbOptions.dialectModule = require('mysql2')

const sequelize = new Sequelize(dbOptions);

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

initializeDatabase();

export default sequelize;