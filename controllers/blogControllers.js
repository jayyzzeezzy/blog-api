const db = require("../db/queries");


/*
* --------------------- Public Access Endpoints -----------------------
*/ 

exports.getPublishedBlogs = async (req, res) => {
    try {
        const publishedBlogs = await db.getPublishedBlogs();

        return res.status(200).json({
            message: "GET /blogs for readers",
            publishedBlogs,
            currentUser: req.user,
        });
    } catch (error) {
        next(error);
    }
};

exports.getBlogByBlogId = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await db.getBlogByBlogId(blogId);

        return res.status(200).json({
            blog,
            currentUser: req.user,
        });
    } catch (error) {
        next(error);
    }
};

exports.createComment = async (req, res) => {
    try {
        const { blogId } = req.params;
        const { commentBody } = req.body;
        const userId = req.user.id;
        const user = await db.findUserById(userId);
        const comment = await db.createComment(user.username, userId, blogId, commentBody);

        return res.status(200).json({
            comment,
            currentUser: req.user,
        });
    } catch (error) {
        console.error(error);
    }
};


/*
* --------------------- Author Access Endpoints -----------------------
*/ 

exports.getAllBlogs = async (req, res) => {
    try {
        if (req.user.isAuthor) {
            const blogs = await db.getAllBlogs();

            return res.status(200).json({
                message: "GET /blogs for author",
                blogs,
                currentUser: req.user,
            });
        } else {
            return res.status(401).json({ error: "Unathorized" });
        }
    } catch (error) {
        next(error);
    }
};

exports.getUnpublishedBlogs = async (req, res) => {
    try {
        if (req.user.isAuthor) {
            const unpublished = await db.getUnpublishedBlogs();

            return res.status(200).json({
                unpublished,
                currentUser: req.user,
            });
        } else {
            return res.status(401).json({ error: "Unathorized" });
        }
    } catch (error) {
        next(error);
    }
};

exports.getAdminBlogByBlogId = async (req, res) => {
    try {
        if (req.user.isAuthor) {
            const { blogId } = req.params;
            const blog = await db.getBlogByBlogId(blogId);
    
            return res.status(200).json({
                blog,
                currentUser: req.user,
            });
        } else {
            return res.status(401).json({ error: "Unathorized" });
        }
    } catch (error) {
        next(error);
    }  
};

exports.createBlog = async (req, res) => {
    try {
        const { title, blogBody, isPublished } = req.body;
        if (req.user.isAuthor) {
            const blog = await db.createBlog(req.user.id, title, blogBody, isPublished);

            return res.status(200).json({
                blog,
                currentUser: req.user,
            });
        } else {
            return res.status(401).json({ error: "Unathorized" });
        }
    } catch (error) {
        next(error);
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        if (req.user.isAuthor) {
            const deletedComment = await db.deleteComment(commentId);

            return res.status(200).json({
                deletedComment,
                currentUser: req.user,
            });
        } else {
            return res.status(401).json({ error: "Unathorized" });
        }
    } catch (error) {
        next(error);
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const { title, blogBody, isPublished } = req.body;

        if (req.user.isAuthor) {
            const updatedBlog = await db.updateBlog(blogId, title, blogBody, isPublished);

            return res.status(200).json({
                updatedBlog,
                currentUser: req.user,
            });
        } else {
            return res.status(401).json({ error: "Unathorized" });
        }
    } catch (error) {
        next(error);
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        if (req.user.isAuthor) {
            const deletedBlog = await db.deleteBlog(blogId);

            return res.status(200).json({
                deletedBlog,
                currentUser: req.user,
            });
        } else {
            return res.status(401).json({ error: "Unathorized" });
        }
    } catch (error) {
        next(error);
    }
};
