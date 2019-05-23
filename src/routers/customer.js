const express = require('express')
const Customer = require('../models/customer')
const router = new express.Router()

router.post('/customers', async (req, res) => {
    const customer = new Customer(req.body)

    try {
        const customer = await customer.save()    
        res.status(201).send(customer)
    } catch (error) {
        res.status(201).send(customer)
    }
})

module.exports = router