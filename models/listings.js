const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title :{
        type:String,
        required:true,
    },
    description : String,
    image :{
        filename: { type: String, required: true },
        url: {
            type: String,
            required: true,
            default: "https://unsplash.com/photos/a-cross-on-a-hill-under-a-night-sky-filled-with-stars-O8hC2HNjL50",
            set: (v) =>
                v === "" ? "https://unsplash.com/photos/a-cross-on-a-hill-under-a-night-sky-filled-with-stars-O8hC2HNjL50" : v,
        },
    },
    price:Number,
    location:String,
    country:String,
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;