import models from '../models';
import express from 'express';
import sequelize from 'sequelize';
import authenticate from '../middlewares/authenticate';

const Op = sequelize.Op;

var router = express.Router();



//MQ:注册成功时异步发送注册成功邮件，加快系统响应速度
var email_queue = [];
var email = require('emailjs');
var server = email.server.connect({
  user: "1198226333@qq.com",
  password:"ecewlqeoretuhagg",
  host:"smtp.qq.com",
  ssl:true
});


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
        
        
        email_queue.push(email);
        setTimeout(function(){
           for(var i = email_queue.length - 1;i >= 0;i--){
              server.send({
                text:"Congratulations!\n\nYou've successfully become a member of Train.",
                from:"1198226333@qq.com",
                to:email_queue[i],
                cc:"1198226333@qq.com",
                subject:"Train"
              },function(err,message){
                console.log(err || message);
              }); 
              console.log(email_queue[i]);
              email_queue.pop();
            }
          },10);
  
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
