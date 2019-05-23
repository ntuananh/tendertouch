const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/tendertouch' , { 
    useNewUrlParser: true,
    useCreateIndex: true
})