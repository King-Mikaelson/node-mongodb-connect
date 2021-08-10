const express = require("express")
const app = express();
const port = 4500;





// SEting up MOONGOSE
const mongoose = require("mongoose")
const connectionString = "mongodb://localhost:27017/Bookapp"

mongoose.connect(connectionString, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useFindAndModify : false
}, (err) => {
    if (err) {
        console.log(err);
    }   else{
        console.log("database connection successful")
    }
})


app.use(express.json())



// Create Schema
const bookSchema = new mongoose.Schema({
title : String,
author : String,
category : String,
purchaseCount : Number,
imageUrl : String,
description : String,
tags : Array,
year : Number

})

const Book = mongoose.model("Book", bookSchema)


// POST REQUEST TO /books to create a new req body;
app.post("/books", (req, res) => {
    Book.create({
        title : req.body.title,
        author : req.body.author,
        category : req.body.category,
        purchaseCount : req.body.purchaseCount,
        imageUrl : req.body.imageUrl,
        description : req.body.description,
        tags : req.body.tags, 
        year : req.body.year
    }, (err, newbook) =>{
        if (err){
            return res.status(500).json({message : err})
        }else {
            return res.status(200).json({message : "Successfuly created", newbook})
        }
    })
})


// GET REQUEST TO /books to fetch all books;
app.get("/books", (req, res) => {
    Book.find({}, (err, books) => {
        if (err) {
            return res.status(500).json({message : err})
        }else {
            return res.status(200).json({ books })
        }
    })
})


// GET REQUEST TO /books to fetch single books;
app.get("/books/:id", (req, res) =>  {
    Book.findOne({ _id :req.params.id}, (err, book) => {
        if(err){
            return res.status(500).json({message : err})
        }else {
            return res.status(200).json({ book })
        }
    })
})




app.listen(port, ()=> console.log(`app listening on ${port}`))