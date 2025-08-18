const { Router } = require("express");
const blogController = require("../controllers/blogControllers");
const passport = require("passport");

const blogRouter = Router();

blogRouter.get("/blogs", passport.authenticate('jwt', {session: false}), blogController.getPublishedBlogs);
blogRouter.get("/blogs/:blogId", passport.authenticate('jwt', {session: false}), blogController.getBlogByBlogId);
blogRouter.post("/blogs/:blogId/comments", passport.authenticate('jwt', {session: false}), blogController.createComment);

// race condition between '/admin/blogs/unpublished' and '/admin/blogs/:blogId'
blogRouter.get("/admin/blogs/unpublished", passport.authenticate('jwt', {session: false}), blogController.getUnpublishedBlogs);
blogRouter.get("/admin/blogs", passport.authenticate('jwt', {session: false}), blogController.getAllBlogs);
blogRouter.get("/admin/blogs/:blogId", passport.authenticate('jwt', {session: false}), blogController.getAdminBlogByBlogId);
blogRouter.post("/admin/blogs", passport.authenticate('jwt', {session: false}), blogController.createBlog);
blogRouter.delete("/admin/blogs/:blogId", passport.authenticate('jwt', {session: false}), blogController.deleteBlog);
blogRouter.put("/admin/blogs/:blogId", passport.authenticate('jwt', {session: false}), blogController.updateBlog);
blogRouter.delete("/admin/blogs/:blogId/comments/:commentId", passport.authenticate('jwt', {session: false}), blogController.deleteComment);

module.exports = blogRouter;