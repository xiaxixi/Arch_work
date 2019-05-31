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
        msg: 'Register successfully!'
      });
    })
    .catch(err => {
      res.status(200).json({
        code: -1,
        msg: 'Register failed（用户名已存在）!'
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
          msg: 'Login successfully!'
        });
      } else {
        res.status(200).json({
          code: -1,
          msg: 'Login failed!'
        });
      }
    })
    .catch(err => {
      res.status(200).json({
        code: -1,
        msg: 'Login failed!'
      });
    });
});

module.exports = router;
