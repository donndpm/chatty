const AuthController = require("../controllers/auth.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Header",
      "x-access-token",
      "Content-Type",
      "Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    AuthMiddleware.verifySignUp,
    AuthController.SignUp
  );

  app.post(
    "/api/auth/signin",
    AuthMiddleware.verifySignIn,
    AuthController.SignIn
  );
};
