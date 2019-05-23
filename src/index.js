const request = require('request')
const express = require('express')
const hbs = require('hbs')
const path = require('path')

require('./db/mongoose')


const Customer = require('./models/customer')
const technicianRouter = require('./routers/technician')
const customerRouter = require('./routers/customer')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(technicianRouter)



app.get('*', (req, res) => {
    res.send('Hello Express')
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
