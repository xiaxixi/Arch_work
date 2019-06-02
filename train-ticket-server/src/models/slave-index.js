const sequelize = require('sequelize');
const dotenv = require('dotenv');
const modelsR = {};
let seqR;

dotenv.config();

// 连接slave服务器 read
seqR = new sequelize(process.env.DB_DB, process.env.DB_USER, process.env.DB_PWD, {
  dialect: process.env.DB_TYPE,
  host: process.env.DB_HOST_READ,
  port: process.env.PORT_READ
});
seqR.sync();

const modulesR = [
  require('./user'),
];

modulesR.forEach(module => {
  const modelR = module(seqR, sequelize);
  modelsR[modelR.name] = modelR;
})

Object.keys(modelsR).forEach(key => {
  if (modelsR[key].associate) {
    modelsR[key].associate(modelsR);
  }
});

modelsR.seqR = seqR;
modelsR.sequelize = sequelize;

module.exports = modelsR;
