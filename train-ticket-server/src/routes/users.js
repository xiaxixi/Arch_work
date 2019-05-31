import models from '../models';
import express from 'express';
import sequelize from 'sequelize';
import authenticate from '../middlewares/authenticate';

const Op = sequelize.Op;

var router = express.Router();

router.post('/register', (req, res) => {
  const { username, password, phone_number, id_no, email, role } = req.body;
  models.User
    .create({
      username, password, phone_number, id_no, email, role
    })
    .then(record => {
      res.status(200).json({
        code: 1,
        user: record.toAuthJSON(),
        msg: '注册成功！'
      });
    })
    .catch(err => {
      res.status(200).json({
        code: -1,
        msg: '注册失败（用户名已存在）！'
      });
    });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  models.User
    .findOne({
      where: {
        [Op.or]: [{ username: username }]
      }
    })
    .then(record => {
      if (record && record.isValidPassword(password)) {
        res.status(200).json({
          code: 1,
          user: record.toAuthJSON(),
          msg: '登陆成功！'
        });
      } else {
        res.status(200).json({
          code: -1,
          msg: '登陆失败（用户名不存在）！'
        });
      }
    })
    .catch(err => {
      res.status(200).json({
        code: -1,
        msg: '登陆失败（用户名不存在）！'
      });
    });
});

module.exports = router;
