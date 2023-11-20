const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'dpg-clc9rpug1b2c73esubrg-a',
  username: 'empdb_user',
  password: 'ewlrYZ0rJoQFOqtduK5DboGRpvnd9b11',
  database: 'empdb',
  port: 5432
});

module.exports = sequelize;
