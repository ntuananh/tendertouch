const jwt = require('jsonwebtoken')
const Technician = require('../models/technician')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const technician = await Technician.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!technician) {
            throw new Error()
        }

        req.token = token
        req.technician = technician
        next()
    } catch (e) {
        res.status(401).send({error: 'Please authenticate. '})
    }
}

module.exports = auth