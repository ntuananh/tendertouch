const mongoose = require('mongoose')
const validator = require('validator')

const Technician = mongoose.model('Technician', {
    name: {
        type: String,
        required: true,
        trim: true
    }, 
    phone: {
        type: String,
        default: '8322074118',
        validate(value) {
            if (value.length !== 10) {
                throw new Error('Phone is not correct')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    }
})

module.exports = Technician