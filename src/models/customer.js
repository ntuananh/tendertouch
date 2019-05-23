const mongoose = require('mongoose')
const validator = require('validator')

const Customer = mongoose.model('Customer', {
    name: {
        type: String,
        required: true,
        trim: true
    }, 
    phone: {
        type: String,
        default: '',
        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error('Phone is not correct')
            }
        }
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    }
})

module.exports = Customer