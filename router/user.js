const UserController = require("../controller/user");
//const authMiddleware = require("../middleware/auth");


module.exports = (router) => {
  router.post("/users/login", UserController.logIn);

  router.post("/users/signup", UserController.signUp);

  router.get("/users/signature-data", UserController.getSignatureData);

  router.patch("/users/profile", UserController.updateProfile);
}

