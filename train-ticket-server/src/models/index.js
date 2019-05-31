const sequelize = require('sequelize');
const dotenv = require('dotenv');
const models = {};
let seq;

dotenv.config();

seq = new sequelize(process.env.DB_DB_SAVE, process.env.DB_USER, process.env.DB_PWD, {
  dialect: process.env.DB_TYPE,
  host: process.env.DB_HOST
});
seq.sync();

const modules = [
  require('./user'),
];

modules.forEach(module => {
  const model = module(seq, sequelize);
  models[model.name] = model;
})

Object.keys(models).forEach(key => {
  if (models[key].associate) {
    models[key].associate(models);
  }
});

models.seq = seq;
models.sequelize = sequelize;

module.exports = models;
