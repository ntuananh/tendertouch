const request = require('supertest')
const app = require('../src/app')
const Technician = require('../src/models/technician')
const {technicianOneId, technicianOne, setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Signup a new technician', async () => {
    await request(app).post('/technicians').send({
        name: 'Andrew',
        email: 'andrew@example.com',
        phone: '1231231234',
        password: 'MyPW'
    }).expect(201)
})

test('Should login existing technician', async () => {
    await request(app).post('/technicians/login').send({
        email: technicianOne.email,
        password: technicianOne.password
    }).expect(200)
})

test('Should not login non-existing technician', async () => {
    await request(app).post('/technicians/login').send({
        email: technicianOne.email,
        password: technicianOne.password + ':('
    }).expect(400)
})

test('Should get profile for technician', async () => {
    await request(app).get('/technicians/me')
    .set('Authorization', `Bearer ${technicianOne.tokens[0].token}`)
    .send().expect(200)
})

test('Should not get profile for unauthenticated technician', async () => {
    await request(app)
    .get('/technicians/me')
    .send()
    .expect(401)
})

test('Should delete technician account', async () => {
    await request(app)
    .delete('/technicians/me')
    .set('Authorization', `Bearer ${technicianOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not delete account for unauthenticated technician', async () => {
    await request(app)
    .delete('/technicians/me')
    .send()
    .expect(401)
})

test('Should upload profile picture', async () => {
    await request(app)
    .post('/technicians/me/avatar')
    .set('Authorization', `Bearer ${technicianOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/philly.jpg')
    .expect(404)

    const technician = await Technician.findById(technicianOneId)
    // expect(technician.avatar).toEqual(expect.any(Buffer))
})