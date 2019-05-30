import models from '../models';
import express from 'express';
<<<<<<< HEAD
import sequelize from 'sequelize';
import authenticate from '../middlewares/authenticate';
=======
import Sequelize from 'sequelize';
// import authenticate from '../middlewares/authenticate';
>>>>>>> 991f10d198d3b400c32c2ac4c4d78aa707b8754d

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
