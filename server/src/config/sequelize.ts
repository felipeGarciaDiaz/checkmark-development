import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.MARIA_DB_NAME!, process.env.MARIA_DB_USER!, process.env.MARIA_DB_PASS!, {
  host: process.env.MARIA_DB_HOST,
  port: Number(process.env.MARIA_DB_PORT),
  dialect: 'mysql',
});

export default sequelize;