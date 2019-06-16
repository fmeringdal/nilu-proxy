const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        trim: true
    },
    data: {
        type : Array,
        default : []
    }
})

storeSchema.statics.findByURL = async url => {
    let savedData;
    try{
        const { data } = await Store.findOne({ url });
        savedData = data;
    } catch(e){
        return;
    }
    return savedData;
}

const Store = mongoose.model('Store', storeSchema)

module.exports = Store