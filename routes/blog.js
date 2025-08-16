const { Router } = require("express");
const blogController = require("../controllers/blogControllers");
const passport = require("passport");

const blogRouter = Router();

blogRouter.get("/blogs", passport.authenticate('jwt', {session: false}), blogController.getAllBlogs);
blogRouter.get("/blogs/:blogId", (req, res) => { res.send("get blogs/blogId") });
blogRouter.post("/blogs/:blogId/comments", (req, res) => { res.send("post blogs/blogId/comments") });

blogRouter.get("/admin/blogs", passport.authenticate('jwt', {session: false}), (req, res) => { res.send("get admin/blogs") });
blogRouter.get("/admin/blogs/:blogId", (req, res) => { res.send("get admin/blogs/blogId") });
blogRouter.get("/admin/blogs/unpublished", (req, res) => { res.send("get admin/blogs/unpublished") });
blogRouter.post("/admin/blogs", (req, res) => { res.send("post admin/blogs") });
blogRouter.delete("/admin/blogs/:blogId", (req, res) => { res.send("delete admin/blogs/blogId") });
blogRouter.put("/admin/blogs/:blogId", (req, res) => { res.send("put admin/blogs/blogId") });
blogRouter.delete("/admin/blogs/:blogId/comments/:commentId", (req, res) => { res.send("delete admin/blogs/blogId/comments/commentId") });

module.exports = blogRouter;