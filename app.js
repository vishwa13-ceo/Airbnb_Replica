const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listings.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/Wanderlust"

main()
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get("/",(req,res)=>{
    res.send("Hey i m root");
});

app.get("/testlisting",async (req,res)=>{
    let samplelisting = new Listing({
        title:"My new Villa",
        description:"By the beach",
        price:1200,
        location:"Panjim , Goa",
        country:"India",
    });

    await samplelisting.save()
    console.log("sample was saved");
    res.send("Sample testing successful");

})

app.listen(8080,()=>{
    console.log("Listening the port on 8080");
});