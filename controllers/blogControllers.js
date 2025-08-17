const db = require("../db/queries");


/*
* --------------------- Public Access Endpoints -----------------------
*/ 

exports.getPublishedBlogs = async (req, res) => {
    try {
        const blogs = await db.getPublishedBlogs();

        return res.status(200).json({
            message: "GET /blogs for readers",
            blogs,
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
        const comment = await db.createComment(userId, blogId, commentBody);

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