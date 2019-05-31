const request = require('supertest')
const app = require('../src/app')
const Transaction = require('../src/models/transaction')
const {technicianOneId, technicianOne, setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create a new transaction', async () => {
    const response = await request(app)
    .post('/transactions')
    .set('Authorization', `Bearer ${technicianOne.tokens[0].token}`)
    .send({

    })
    .expect(201)
})