// const express = require('express');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const {Padhlo,Course} = require('./Schema/PadhloSchema');

// const app = express();

// app.use(
//     bodyParser.urlencoded({ extended: true})
// )

// app.listen(3000, function () {
//     console.log('Server rocking on port 3000');
// })

// mongoose.connect("mongodb://localhost:27017/padloDB",{ useNewUrlParser: true ,useUnifiedTopology: true})

// console.log("Connected to database");

// const PDFSchema = mongoose.Schema({
//     sem : int,
//     unit : int,
//     topic : String,
//     dataType : String,
//     data : Buffer,
// });

// var pdfData = fs.readFileSync('/home/sidd/Downloads/resume.pdf');
// //application/pdf

async function saveFile()
{
    const padhloSchema = new Padhlo({
        
    courses : [
   
    ],
       
    
});
 await padhloSchema.save(function(err) {
        if(!err)
        {
            console.log('Stored Successfully')
        }
        else
        {
            console.log(err);
        }
    });
}

async function updateCourseName (courseToUpdate , updatedCourseName)
{
    await padhloSchema.updateOne(
    {"courses.course":courseToUpdate.toString()},
    {$set : {"courses.$.course": updatedCourseName.toString()}},
    function(err)
    {
        if(!err)
        {
            console.log("Updated Successfully");
        }
        else
        {
            console.log(err);
        }
    }
    )
}

module.exports = {saveFile,updateCourseName}
