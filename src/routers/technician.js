const express = require('express')
const Technician = require('../models/technician')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/technicians', async (req, res) => {
    const technician = new Technician(req.body)

    try {
        await technician.save()
        const token = await technician.generateAuthToken()

        res.status(201).send({
            technician,
            token
        })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/technicians/login', async (req, res) => {
    try {
        const technician = await Technician.findByCredentials(req.body.email, req.body.password)
        const token = await technician.generateAuthToken()
        res.send({
            technician,
            token
        })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/technicians/logout', auth, async (req, res) => {
    try {
        req.technician.tokens = req.technician.tokens.filter(token => {
            return token.token !== req.token
        })

        await req.technician.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/technicians/logoutAll', auth, async (req, res) => {
    try {
        req.technician.tokens = []
        await req.technician.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})
router.get('/technicians/me', auth, async (req, res) => {
    res.send(req.technician)
})


router.get('/technicians/:id', async (req, res) => {
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

router.patch('/technicians/:id', auth, async (req, res) => {
    try {
        const technician = await Technician.findById(req.params.id)

        if (!technician) {
            return res.status(404).send()
        }

        Object.keys(req.body).forEach(element => {
            technician[element] = req.body[element]
        });

        await technician.save()

        res.send(technician)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/technicians/me', auth, async (req, res) => {
    try {
        await req.technician.remove()
        res.send(req.technician)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router