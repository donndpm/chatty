const db = require("../models");
const bcrypt = require("bcrypt");
const authConfig = require("../config/auth.config");
const jwt = require("jsonwebtoken");

const Op = require("sequelize").Op;

const SignUp = (req, res) => {
  const hashPassword = bcrypt.hashSync(req.body.password, 8);

  db.user
    .create({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    })
    .then((user) => {
      if (req.body.roles) {
        db.role
          .findAll({
            where: {
              name: {
                [Op.or]: req.body.roles,
              },
            },
          })
          .then((roles) => {
            if (roles) {
              user.setRoles(roles).then(() => {
                return res.status(201).send({
                  message: "Registration successful!",
                });
              });
            }
          });
      } else {
        user.setRoles([1]).then(() => {
          return res.status(201).send({
            message: "Registration successful!",
          });
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message,
      });
    });
};

const SignIn = (req, res) => {
  const isPasswordValid = bcrypt.compareSync(
    req.body.password,
    res.locals.user.password
  );

  if (!isPasswordValid) {
    return res.status(400).send({
      message: "Invalid Passwrord!",
    });
  }

  jwt.sign(
    {
      userID: res.locals.user.id,
    },
    authConfig.SECRET,
    {
      expiresIn: "1h",
    },
    (err, token) => {
      if (err) {
        return res.status(500).send({
          message: "Something went wrong while generating token!",
        });
      }

      return res.status(200).send({
        username: res.locals.user.username,
        email: res.locals.user.email,
        roles: res.locals.roles,
        token: token,
      });
    }
  );
};

const AuthController = {
  SignUp,
  SignIn,
};

module.exports = AuthController;
