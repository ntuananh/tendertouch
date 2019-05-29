const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Transaction = require('./transaction')

const technicianSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, 
    phone: {
        type: String,
        unique: true,
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
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

technicianSchema.methods.generateAuthToken = async function() {
    const technician = this
    const token = jwt.sign({_id: technician._id.toString()}, process.env.JWT_SECRET)

    technician.tokens = technician.tokens.concat({token})
    await technician.save()

    return token
}

technicianSchema.virtual('transactions', {
    ref: 'Transaction',
    localField: '_id',
    foreignField: 'technician'
})

technicianSchema.methods.toJSON = function () {
    const technician = this
    const technicianObject = technician.toObject()

    delete technicianObject.tokens
    delete technicianObject.password
    
    return technicianObject
}

technicianSchema.statics.findByCredentials = async (email, password)  => {
    const technician = await Technician.findOne({email})

    if (!technician) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, technician.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return technician
}

technicianSchema.pre('save', async function (next) {
    const technician = this

    if (technician.isModified('password')) {
        technician.password = await bcrypt.hash(technician.password, 8)
    }

    next()
})

technicianSchema.pre('remove', async function (next) {
    const technician = this
    await Transaction.deleteMany({ technician: technician._id})
    next()
})

const Technician = mongoose.model('Technician', technicianSchema)

module.exports = Technician