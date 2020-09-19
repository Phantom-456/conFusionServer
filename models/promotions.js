const mongoose = require("mongoose");
const { model } = require("./dishes");
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

PromotionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: { 
        type : String,
        required: true
    },
    label: { 
        type:String,
        default: '',
    },
    price: { 
        type: Currency,
        required: true,
        min: 0,
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type:Boolean,
        default:false,
        required:true
    },
},
{
    timestamps:true
});

const Promotions = mongoose.model("Promotion",PromotionSchema);

module.exports = Promotions;