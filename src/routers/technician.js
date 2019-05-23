const express = require('express')
const router = new express.Router()
const Technician = require('../models/technician')

router.post('/technicians', async (req, res) => {
    const technician = new Technician(req.body)

    try {
        await technician.save()
        res.status(201).send(technician)
    } catch (e) {
        res.status(400).send(error)
    }
})

router.get('/technicians', async (req, res) => {
    try {
        const technicians = await Technician.find({})
        res.send(technicians)
    } catch (error) {
        res.status(500).send()
    }
})


app.get('/technicians/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const technician = await Technician.findById(_id)
        if (!technician) {
            return res.status(404).send()
        }

        res.send(technician)
    } catch (error) {
        res.status(500).send(e)
    }
})

router.patch('/technicians/:id', async (req, res) => {
    try {
        const technician = await Technician.findByIdAndDelete(req.params.id, req.body, { new: true, runValidators: true })

        if (!technician) {
            return res.status(404).send()
        }

        res.send(technician)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/technicians/:id', async (req, res) => {
    try {
        const technician = await Technician.findByIdAndDelete(req.params.id)
        if (!technician) {
            res.status(404).send()
        }

        res.send(technician)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router