import { Sequelize } from "sequelize-typescript";
import { Bands } from "./bands/Bands";
import { Comments } from "./comments/Comments";
import { Posts } from "./posts/Posts";
import { Roles } from "./roles/Roles";
import { Users } from "./users/Users";

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  dialect: 'postgres',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  models: [Bands, Comments, Posts, Roles, Users]
});



const initDB = async () => {
  await sequelize.authenticate();
  await sequelize.sync();
};

export const DB = {
  sequelize,
  initDB
};
