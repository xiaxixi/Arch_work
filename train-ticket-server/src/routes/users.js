import modelsW from '../models/index.js';
import modelsR from '../models/slave-index.js';
import express from 'express';
import sequelize from 'sequelize';
import authenticate from '../middlewares/authenticate';

const Op = sequelize.Op;

var router = express.Router();

//MQ:注册成功时异步发送注册成功邮件，加快系统响应速度
const nodemailer = require('nodemailer');
var email_queue = [];
let transporter = nodemailer.createTransport({
  host: 'smtp.qq.com', //发送者邮箱服务端口,参考 https://github.com/nodemailer/nodemailer-wellknown/blob/master/services.json
  secureConnection: true, // use SSL
  port: 465,
  secure: true,
  auth: {
    user: '1198226333@qq.com', //发送者邮箱
    pass: 'ecewlqeoretuhagg'  //发送者邮箱授权码，不是登录或者独立密码，是你设置的smtp授权密码
  }
});

router.post('/register', (req, res) => {
  const { username, password, phone_number, id_no, email, role } = req.body;
  modelsW.User
    .create({
      username, password, phone_number, id_no, email, role
    })
    .then(record => {
      res.status(200).json({
        code: 1,
        user: record.toAuthJSON(),
        msg: '注册成功！'
      });

      email_queue.push(email);
      setTimeout(function () {
        for (var i = email_queue.length - 1; i >= 0; i--) {
          let mailOptions = {
            from: '1198226333@qq.com', //发送者邮箱
            to: email_queue[i], //接受者邮箱,可以设置多个
            subject: 'Train', //邮件主题
            text: "Congratulations!\n\nYou've successfully become a member of Train."//信箱里邮件列表时，此邮件显示的内容说明
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log(`Message: ${info.messageId}`);
            console.log(`sent: ${info.response}`);
          });
          console.log(email_queue[i]);
          email_queue.pop();
        }
      }, 10);

    })
    .catch(err => {
      res.status(200).json({
        code: -1,
        msg: '注册失败！'
      });
    });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  modelsR.User
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
          msg: '登陆失败！'
        });
      }
    })
    .catch(err => {
      res.status(200).json({
        code: -1,
        msg: '登陆失败！'
      });
    });
});

module.exports = router;
