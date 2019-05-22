const request = require('request')
const express = require('express')
const hbs = require('hbs')
const path = require('path')

const port = process.env.port || 3000

const app = express()

app.get('*', (req, res) => {
    res.send('Hello Express')
})

app.listen(port, () => {
    console.log('Server is up!')
})
