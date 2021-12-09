const db = require("../models");

const verifySignUp = (req, res, next) => {
  //check if username already exists
  db.user
    .findOne({
      where: {
        username: req.body.username,
      },
    })
    .then((user) => {
      if (user) {
        return res.status(400).send({
          message: "Username already taken!",
        });
      }

      //check if email already exists
      db.user
        .findOne({
          where: {
            email: req.body.email,
          },
        })
        .then((email) => {
          if (email) {
            return res.status(400).send({
              message: "Email already taken!",
            });
          }

          next();
        });
    });
};

const verifySignIn = (req, res, next) => {
  db.user
    .findOne({
      where: {
        username: req.body.username,
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(400).send({
          message: "Invalid username!",
        });
      }

      let userRoles = new Array();
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          userRoles.push(roles[i].name);
        }

        res.locals.user = user;
        res.locals.roles = userRoles;
        next();
      });
    });
};

const AuthMiddleware = {
  verifySignIn,
  verifySignUp,
};

module.exports = AuthMiddleware;
