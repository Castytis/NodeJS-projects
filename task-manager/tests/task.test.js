const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const { userOneId, userOne, setupDataBase, userTwo, taskOne } = require('./fixtures/db')

beforeEach(setupDataBase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From testing suite'
        })
        expect(201)
    
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toBe(false)
})

test('Should get all users tasks', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        expect(200)
    expect(response.body.length).toBe(2)
})

test('User should not delete other users tasks', async () => {
    await request(app)
        .delete('/tasks/'+taskOne._id)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        expect(404)
    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})
