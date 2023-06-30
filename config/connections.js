const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/socialnetwork',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.set('debug', true)

module.exports = mongoose.connection;