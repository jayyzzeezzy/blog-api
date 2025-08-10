const { Router } = require("express");
const blogRouter = require("./blog");
const authRouter = require("./auth");

const routes = Router();

routes.use(authRouter);
routes.use(blogRouter);

module.exports = routes;