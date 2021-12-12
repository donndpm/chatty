const express = require("express");
const bodyParser = require("body-parser");
const PORT = 3001;
const app = express();
const db = require("./models");
const checkRole = require("./middlewares/role.middleware");
const checkToken = require("./middlewares/auth.middleware");

//db.sequelize.sync({force:true}).then(()=> initial())
db.sequelize.sync();

function initial() {
  db.role.create({
    id: 1,
    name: "user",
  });

  db.role.create({
    id: 2,
    name: "admin",
  });

  db.role.create({
    id: 3,
    name: "moderator",
  });
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//user auth routes
require("./routes/auth.route")(app);

app.get("/api", [checkToken.verifyToken, checkRole.isAdmin], (req, res) => {
  return res.status(200).send({
    message: "Its working!",
  });
});

app.listen(PORT || 3001, () => {
  console.log("App is running in PORT " + PORT);
});
