const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')


const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'userOne',
    email: 'userOne@gmail.com',
    password: 'userOne',
    tokens:[{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}

const setupDataBase = async () => {
        await User.deleteMany()
        await new User(userOne).save()
}

module.exports = {
    setupDataBase,
    userOne,
    userOneId
}