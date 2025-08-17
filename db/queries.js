const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

exports.createUser = async (username, password, isAuthor = false) => {
    const user = await prisma.user.create({
        data: {
            username,
            password,
            isAuthor,
        },
    });
    return user;
};

exports.findUserByUsername = async (username) => {
    const user = await prisma.user.findUnique({
        where: {
            username: username,
        },
    });
    return user;
};

exports.findUserById = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });
    return user;
};

exports.getAllBlogs = async () => {
    const blogs = await prisma.blog.findMany();
    return blogs;
};

exports.getPublishedBlogs = async () => {
    const blogs = await prisma.blog.findMany({
        where: {
            isPublished: true,
        }
    });
    return blogs;
};

exports.getBlogByBlogId = async (blogId) => {
    const blog = await prisma.blog.findFirst({
        where: {
            id: blogId,
        },
        include: {
            comments: true,
            likes: true,
        },
    });  
    return blog;
};

exports.createBlog = async (userId, title, bodyText, isPublished = false) => {
    const blog = await prisma.blog.create({
        data: {
            ownershipId: userId,
            title,
            body: bodyText,
            isPublished
        },
    });
    return blog;
}

exports.createComment = async (userId, blogId, commentBody) => {
    const comment = await prisma.comment.create({
        data: {
           ownershipId: userId,
           blogId: blogId,
           body: commentBody, 
        },
    });
    return comment;
}