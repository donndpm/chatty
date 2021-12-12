const db = require("../models/index");

const isUser = (req, res, next) => {
  db.user.findByPk(res.locals.userID).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "user") {
          next();
          return;
        }
      }

      return res.status(401).send({
        message: "Unauthorized!",
      });
    });
  });
};

const isAdmin = (req, res, next) => {
  db.user.findByPk(res.locals.userID).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      return res.status(401).send({
        message: "Unauthorized!",
      });
    });
  });
};

const isModerator = (req, res, next) => {
  console.log(res.locals.userID);
  db.user.findByPk(res.locals.userID).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      return res.status(401).send({
        message: "Unauthorized!",
      });
    });
  });
};

const checkRole = {
  isUser,
  isAdmin,
  isModerator,
};

module.exports = checkRole;
