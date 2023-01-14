import { Sequelize } from "sequelize-typescript";


const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  dialect: 'postgres',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
});



export const initDB = async () => {
  await sequelize.authenticate();
  await sequelize.sync();
};
