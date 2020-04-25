var express = require('express');
var router = express.Router();
const Technician = require('../models/technician');

router.get('/', (req, res) => {
    res.send('Hello from technician');
});


router.post('/', async(req, res) => {
    const mai = Technician.build({ firstName: "Mai", lastName: "Nguyen", phone: "8322578945" });
    await mai.save();
    res.send('Success!')
})

module.exports = router;