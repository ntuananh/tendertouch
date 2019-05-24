const express = require('express')
const auth = require('../middleware/auth')
const Transaction = require('../models/transaction')

const router = new express.Router()

router.post('/transactions', auth, async (req, res) => {
    const transaction = new Transaction({
        ...req.body,
        // technician: req.technician._id
    })

    try {
        await transaction.save()
        res.status(201).send(transaction)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router