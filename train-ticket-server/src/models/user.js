import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// 创建user表
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    'User', {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      phone_number: {
        type: DataTypes.CHAR(11),
        allowNull: false,
        unique: true
      },
      id_no: {
        type: DataTypes.CHAR(18),
        unique: true
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    }, {
      hooks: {
        beforeCreate: user => {
          user.password = user.encryptPassword(user.password);
        },
      },
      freezeTableName: true,
      tableName: 'User'
    }
  );

  // Bcrypt加密
  User.prototype.encryptPassword = function (password) {
    return bcrypt.hashSync(password, 10);
  }

  User.prototype.toAuthJSON = function () {
    return {
      username: this.username,
      email: this.email,
      phone_number: this.phone_number,
      id_no: this.id_no,
      role: this.role,
      token: this.generateJWT()
    };
  }

  User.prototype.generateJWT = function () {
    return jwt.sign({
      username: this.username,
      email: this.email,
      phone_number: this.phone_number,
      id_no: this.id_no,
      role: this.role,
    }, process.env.JWT_SECRET);
  }

  // 验证密码是否一致
  User.prototype.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  }

  return User;
};