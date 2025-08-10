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