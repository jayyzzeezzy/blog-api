const { Router } = require("express");
const authController = require("../controllers/authControllers");

const authRouter = Router();

authRouter.post("/login", authController.postLogin);

module.exports = authRouter;