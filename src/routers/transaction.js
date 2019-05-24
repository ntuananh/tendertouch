const express = require('express')
const auth = require('../middleware/auth')
const Transaction = require('../models/transaction')

const router = new express.Router()

router.post('/transactions', auth, async (req, res) => {
    const transaction = new Transaction({
        ...req.body,
        technician: req.technician._id
    })

    try {
        await transaction.save()
        res.status(201).send(transaction)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/transactions', auth, async (req, res) => {
    try {
        const transactions = await Transaction.find()

        const match = {}
        const sort = {}

        if (req.query.note) {
            match.note = req.query.note
        }

        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        }

        // await transactions.populate({
        //     // path: 'technician',
        //     match,
        //     options: {
        //         limit: parseInt(req.params.limit),
        //         skip: parseInt(req.params.skip),
        //         sort: {
        //             createdAt: -1
        //         }
        //     }
        // }).execPopulate()

        res.send(transactions)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

module.exports = router