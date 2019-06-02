const sequelize = require('sequelize');
const dotenv = require('dotenv');
const modelsW = {};
let seqW;

dotenv.config();

// 连接master服务器 writer
seqW = new sequelize(process.env.DB_DB, process.env.DB_USER, process.env.DB_PWD, {
  dialect: process.env.DB_TYPE,
  host: process.env.DB_HOST_WRITE,
  port: process.env.PORT_WRITE
});
seqW.sync();

const modulesW = [
  require('./user'),
];

modulesW.forEach(module => {
  const modelW = module(seqW, sequelize);
  modelsW[modelW.name] = modelW;
})

Object.keys(modelsW).forEach(key => {
  if (modelsW[key].associate) {
    modelsW[key].associate(modelsW);
  }
});

modelsW.seqW = seqW;
modelsW.sequelize = sequelize;

module.exports = modelsW;
