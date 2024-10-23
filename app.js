const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listings.js");
const path = require("path");
const methodOverride = require("method-override");

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

app.set("view engine ","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


app.get("/",(req,res)=>{
    res.send("Hey i m root");
});

//Index Route
app.get("/listings",async (req,res)=>{
     const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
})


//New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})

//Show Route
app.get("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})


//Create Route
app.post("/listings",async(req,res)=>{
    // let listing = req.body.listing;
    // console.log(listing);
    const newListing = new Listing(req.body.listing);
    console.log(newListing);
    await newListing.save();
    res.redirect("/listings");
})

//Edit Route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing}); 
})


//Update Route
app.put("/listings/:id",async(req,res)=>{
    let {id} = req.params;
     await Listing.findByIdAndUpdate(id,{...req.body.listing});
     res.redirect("/listings");

})


//Delete Route
app.delete("/listings/:id",async(req,res)=>{
    let {id} =req.params;
    let DeletedListing = await Listing.findByIdAndDelete(id);
    console.log(DeletedListing);
    res.redirect("/listings");
})
// app.get("/testlisting",async (req,res)=>{
//     let samplelisting = new Listing({
//         title:"My new Villa",
//         description:"By the beach",
//         price:1200,
//         location:"Panjim , Goa",
//         country:"India",
//     });

//     await samplelisting.save()
//     console.log("sample was saved");
//     res.send("Sample testing successful");

// })

app.listen(8080,()=>{
    console.log("Listening the port on 8080");
});