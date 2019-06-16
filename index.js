const express = require('express');
const app = express();

const DBConnect = require('./db/dbConnection');

const PORT = process.env.PORT || 8080;

const routes = require('./routes');

//Exits process if it fails to connect to MongoDB
DBConnect();

//In production I would have prefixed routes with a version number
//to easier enable evolvement of the backends functionality
//app.use('/v1/', routes)
app.use('/', routes);


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})