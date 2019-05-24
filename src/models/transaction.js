const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: new Date()
    },
    technician: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Technician'
    }, 
    note: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction

