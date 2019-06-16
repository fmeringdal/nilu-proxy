const mongoose = require('mongoose')

const DBConnect = async() => {
    try{
        await mongoose.connect("mongodb://mongo:27017/nilu", {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            connectTimeoutMS : 2000
        })
        console.log("Successfully connected to MongoDB");
    } catch(e){
        console.log("Could not connect to MongoDB at localhost:27017/nilu");
        process.exit(0);
    }
}


module.exports = DBConnect;