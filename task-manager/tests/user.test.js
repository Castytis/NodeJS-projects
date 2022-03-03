const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
    name: 'userOne',
    email: 'userOne@gmail.com',
    password: 'userOne'
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

 
test('Should signup new user', async () => {
    await request(app).post('/users').send({
        name: 'Mike',
        email: 'mike@gmail.com',
        password: 'mikemike'
    }).expect(201)
})

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: 'bad@gmail.com',
        password: '123456789'
    }).expect(400)
})