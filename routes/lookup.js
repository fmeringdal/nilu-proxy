const router = require('express').Router();
const axios = require('axios');
// individual lookup routes

//Mongoose models
const Store = require('../db/models/Store');

const LOOKUP_HOST = "https://api.nilu.no";

/**
 * Checks if a get request with that URL has been issued before
 * and returns the stored data if it has. Otherwise it goes and fetches
 * the data, stores it and then returns it.
 */
const getLookupData = async url => {
    //TODO:
    //This function should probably be placed another place
    //so that it could also be used by routes other than just /lookup/* routes
    
    //Check if req with that url has been issued before
    const savedData = await Store.findByURL(url);
    if(savedData){
        console.log("Data returned from store");
        return savedData
    };

    //Data has not been fetched before, now go and fetch it
    console.log("Data returned from API");

    let lookupData;
    try{
        const { data, status } = await axios.get(url);
        if(status !== 200) throw Error;
        lookupData = data;
    } catch(e){
        //Could check the status code and make a better
        //error response in the future
        return "Invalid request";
    }

    try{
        await new Store({ url, data : lookupData }).save();
    } catch(e){
        console.log(e);
        return "Could not save response to the database";
    }

    return lookupData;
}

router.use((req, res, next) => {
    /**
     * LookupDataURL will be used as the key when
     * saving data to the store.
     * Adding hostname to the url so that in the future 
     * this api can work as a proxy for more than one host
     */

    req.lookupDataURL = LOOKUP_HOST+req.originalUrl;
    next();
})


//To get access to all /lookup APIs just uncomment the code below
// router.get("/*", async(req, res) => {
//     const data = await getLookupData(req.lookupDataURL);
//     res.send(data);
// });

router.get('/areas', async (req, res) => {  

    const areas = await getLookupData(req.lookupDataURL);
    res.send(areas);
});

router.get("/stations", async (req, res) => {

    const stations = await getLookupData(req.lookupDataURL);
    res.send(stations);
});


module.exports = router;  