const request = require('request')
const express = require('express')
const hbs = require('hbs')
const path = require('path')
require('./db/mongoose')

const technicianRouter = require('./routers/technician')
const customerRouter = require('./routers/customer')
const transactionRouter = require('./routers/transaction')

const app = express()

const multer = require('multer')
const upload = multer({
    dest: 'images'
})

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})

app.use(express.json())
app.use(technicianRouter)
app.use(customerRouter)
app.use(transactionRouter)


app.get('*', (req, res) => {
    res.send('Hello Express')
})

module.exports = app