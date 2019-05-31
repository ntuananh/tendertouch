const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Technician = require('../../src/models/technician')
const Transaction = require('../../src/models/transaction')

const technicianOneId = new mongoose.Types.ObjectId()
const technicianOne = {
    _id: technicianOneId,
    name: 'Nancy',
    email: 'nancy@gmail.com',
    password: 'sadasdasd',
    tokens: [
        {
            token: jwt.sign({_id: technicianOneId }, process.env.JWT_SECRET)
        }
    ]
}

const setupDatabase = async () => {
    await Technician.deleteMany()
    await new Technician(technicianOne).save()
}

module.exports = {
    technicianOneId,
    technicianOne,
    setupDatabase
}