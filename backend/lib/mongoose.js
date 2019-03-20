const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/trello', function (err) {
    if (err) throw err;
    console.log('connection to mongodb is installed.');
});

module.exports = mongoose;