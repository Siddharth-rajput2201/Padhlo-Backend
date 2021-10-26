const express = require('express');
const mongoose = require('mongoose');
const schema = require('./functions.js');
require('dotenv').config()

const {Padhlo,Course,Semester,Subject,Unit,Topic} = require('./PadhloSchema.js');
const { QuestionPaper,QCourse,QSemester,QSubject,QYear } = require('./QuestionPaperSchema')

const app = express();
const port = process.env.PORT || 3000 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let serverStatus = true;

app.listen(port, function () {
    console.log('Server rocking on port 3000');
})

//mongoose.connect(process.env.DB_HOST_URL,{ useNewUrlParser: true ,useUnifiedTopology: true})
mongoose.connect("mongodb://localhost:27017/padhloDB",{ useNewUrlParser: true ,useUnifiedTopology: true})

console.log("Connected to database");


app.get('/save',function(req, res)
{
    schema.saveFile();
});

app.get('/saveQuestionPaper',function(req, res)
{
    schema.saveQuestionPaper();
});

app.put('/updateCourseName', async function(req, res)
{
    await Padhlo.updateOne(
        {"courses.course":req.body.OldCourseName},
        {$set : {"courses.$.course": req.body.NewCourseName}},
        function(err)
        {
            if(!err)
            {
                res.status(200).send("OK");
            }
            else
            {
                res.status(404).send("error");
            }
        }
        )
});

app.put('/updateSemester', async function(req, res)
{
    await Padhlo.updateOne(
         {},
         {$set : {"courses.$[c].semesters.$[s].sem": parseInt(req.body.NewSemester)}},
          {
            arrayFilters: [
              {
                "c.course": req.body.course
              },
              {
                "s.sem": parseInt(req.body.OldSemester)
              }
            ]
          },
        function(err)
        {
            if(!err)
            {
                res.status(200).send("OK");
            }
            else
            {
                res.status(404).send(err);
                console.log(err);
            }
        }
        )
});

app.put('/updateSubject', async function(req, res)
{
    await Padhlo.updateOne(
         {},
         {$set : {"courses.$[c].semesters.$[s].subjects.$[sub].subject": req.body.newSubject}},
          {
            arrayFilters: [
              {
                "c.course": req.body.course
              },
              {
                "s.sem": parseInt(req.body.semester)
              },
              {
                "sub.subject": req.body.oldSubject
              }
            ]
          },
        function(err)
        {
            if(!err)
            {
                res.status(200).send("OK");
            }
            else
            {
                res.status(404).send(err);
                console.log(err);
            }
        }
        )
});

app.put('/updateUnitNumber', async function(req, res)
{
    await Padhlo.updateOne(
         {},
         {$set : {"courses.$[c].semesters.$[s].subjects.$[sub].units.$[u].unit": req.body.newUnit}},
          {
            arrayFilters: [
              {
                "c.course": req.body.course
              },
              {
                "s.sem": parseInt(req.body.semester)
              },
              {
                "sub.subject": req.body.subject
              },
              {
                "u.unit":req.body.oldUnit
              }
            ]
          },
        function(err)
        {
            if(!err)
            {
                res.status(200).send("OK");
            }
            else
            {
                res.status(404).send(err);
                console.log(err);
            }
        }
        )
});

app.put('/updateUnitPdfName', async function(req, res)
{
    await Padhlo.updateOne(
         {},
         {$set : {"courses.$[c].semesters.$[s].subjects.$[sub].units.$[u].pdfName": req.body.newUnitPdfName}},
          {
            arrayFilters: [
              {
                "c.course": req.body.course
              },
              {
                "s.sem": parseInt(req.body.semester)
              },
              {
                "sub.subject": req.body.subject
              },
              {
                "u.unit":req.body.unit
              }
            ]
          },
        function(err)
        {
            if(!err)
            {
                res.status(200).send("OK");
            }
            else
            {
                res.status(404).send(err);
                console.log(err);
            }
        }
        )
});

app.put('/updateTopic', async function(req, res)
{
    await Padhlo.updateOne(
         {},
         {$set : {"courses.$[c].semesters.$[s].subjects.$[sub].units.$[u].topics.$[t].topic": req.body.newTopic}},
          {
            arrayFilters: [
              {
                "c.course": req.body.course
              },
              {
                "s.sem": parseInt(req.body.semester)
              },
              {
                "sub.subject": req.body.subject
              },
              {
                "u.unit":req.body.unit
              },
              {
                  "t.topic" : req.body.oldTopic
              }
            ]
          },
        function(err)
        {
            if(!err)
            {
                res.status(200).send("OK");
            }
            else
            {
                res.status(404).send(err);
                console.log(err);
            }
        }
        )
});

app.put('/updateTopicYoutubeUrl', async function(req, res)
{
    await Padhlo.updateOne(
         {},
         {$set : {"courses.$[c].semesters.$[s].subjects.$[sub].units.$[u].topics.$[t].youtubeUrl": req.body.newYoutubeUrl}},
          {
            arrayFilters: [
              {
                "c.course": req.body.course
              },
              {
                "s.sem": parseInt(req.body.semester)
              },
              {
                "sub.subject": req.body.subject
              },
              {
                "u.unit":req.body.unit
              },
              {
                "t.topic" : req.body.topic
              }
            ]
          },
        function(err)
        {
            if(!err)
            {
                res.status(200).send("OK");
            }
            else
            {
                res.status(404).send(err);
                console.log(err);
            }
        }
        )
});

app.put('/updateTopicPdfName', async function(req, res)
{
    await Padhlo.updateOne(
         {},
         {$set : {"courses.$[c].semesters.$[s].subjects.$[sub].units.$[u].topics.$[t].pdfName": req.body.newPdfName}},
          {
            arrayFilters: [
              {
                "c.course": req.body.course
              },
              {
                "s.sem": parseInt(req.body.semester)
              },
              {
                "sub.subject": req.body.subject
              },
              {
                "u.unit":req.body.unit
              },
              {
                "t.topic" : req.body.topic
              }
            ]
          },
        function(err)
        {
            if(!err)
            {
                res.status(200).send("OK");
            }
            else
            {
                res.status(404).send(err);
                console.log(err);
            }
        }
        )
});

app.put('/updateTopicPdfUrl', async function(req, res)
{
    await Padhlo.updateOne(
         {},
         {$set : {"courses.$[c].semesters.$[s].subjects.$[sub].units.$[u].topics.$[t].pdfUrl": req.body.newPdfUrl}},
          {
            arrayFilters: [
              {
                "c.course": req.body.course
              },
              {
                "s.sem": parseInt(req.body.semester)
              },
              {
                "sub.subject": req.body.subject
              },
              {
                "u.unit":req.body.unit
              },
              {
                "t.topic" : req.body.topic
              }
            ]
          },
        function(err)
        {
            if(!err)
            {
                res.status(200).send("OK");
            }
            else
            {
                res.status(404).send(err);
                console.log(err);
            }
        }
        )
});

app.get('/insertCourse', async function(req,res)
{
    const course = new Course({
        course : req.body.course
    });
    await Padhlo.updateOne(
        {$addToSet : {"courses":course}},
        function(err)
        {
            if(!err)
            {
                res.status(200).send("OK");
            }
            else
            {
                res.status(404).send(err);
                console.log(err)
            }
        }
        )
});

app.get('/insertSemester', async function(req, res)
{
    const semester = new Semester({
        sem : parseInt(req.body.semester)
    })
    await Padhlo.updateOne(
        {"courses.course":req.body.course},
        {$addToSet : {"courses.$.semesters":semester}},
        function(err)
        {
            if(!err)
            {
                res.status(200).send("OK");
            }
            else
            {
                res.status(404).send(err);
            }
        }
        )
});

app.get('/insertSubject', async function(req, res)
{
    const subject = new Subject({
        subject : req.body.subject
    })
    await Padhlo.updateOne(
         {},
         {$addToSet : {"courses.$[c].semesters.$[s].subjects":subject}},
          {
            arrayFilters: [
              {
                "c.course": req.body.course
              },
              {
                "s.sem": parseInt(req.body.semester)
              }
            ]
          },
        function(err)
        {
            if(!err)
            {
                res.status(200).send("OK");
            }
            else
            {
                res.status(404).send(err);
                console.log(err);
            }
        }
        )
});

app.get('/insertUnit', async function(req, res)
{
    const unit = new Unit({
        unit : parseInt(req.body.unit),
        pdfName : req.body.pdfName,
        pdfUrl : req.body.pdfUrl
    })
    await Padhlo.updateOne(
         {},
         {$addToSet : {"courses.$[c].semesters.$[s].subjects.$[sub].units":unit}},
          {
            arrayFilters: [
              {
                "c.course": req.body.course
              },
              {
                "s.sem": parseInt(req.body.semester)
              },
              {
                  "sub.subject": req.body.subject
              }
            ]
          },
        function(err)
        {
            if(!err)
            {
                res.status(200).send("OK");
            }
            else
            {
                res.status(404).send(err);
                console.log(err);
            }
        }
        )
});

app.get('/insertTopic', async function(req, res)
{
    const topic = new Topic({
        topic : req.body.topic,
        youtubeUrl : req.body.youtubeUrl,
        pdfName : req.body.pdfName,
        pdfUrl : req.body.pdfUrl,
    })
    await Padhlo.updateOne(
         {},
         {$addToSet : {"courses.$[c].semesters.$[s].subjects.$[sub].units.$[u].topics":topic}},
          {
            arrayFilters: [
              {
                "c.course": req.body.course
              },
              {
                "s.sem": parseInt(req.body.semester)
              },
              {
                "sub.subject": req.body.subject
              },
              {
                "u.unit" : parseInt(req.body.unit)
              }
            ]
          },
        function(err)
        {
            if(!err)
            {
                res.status(200).send("OK");
            }
            else
            {
                res.status(404).send(err);
                console.log(err);
            }
        }
        )
});

app.get('/insertQuestionPaperCourse', async function(req,res)
{
    const course = new Course({
        course : req.body.course
    });
    await QuestionPaper.updateOne(
        {$addToSet : {"courses":course}},
        function(err)
        {
            if(!err)
            {
                res.status(200).send("OK");
            }
            else
            {
                res.status(404).send(err);
                console.log(err)
            }
        }
        )
});

app.get('/insertQuestionPaperSemester', async function(req, res)
{
    const semester = new QSemester({
        sem : parseInt(req.body.semester)
    })
    await QuestionPaper.updateOne(
        {"courses.course":req.body.course},
        {$addToSet : {"courses.$.semesters":semester}},
        function(err)
        {
            if(!err)
            {
                res.status(200).send("OK");
            }
            else
            {
                res.status(404).send(err);
            }
        }
        )
});

app.get('/insertQuestionPaperSubject', async function(req, res)
{
    const subject = new QSubject({
        subject : req.body.subject
    })
    await QuestionPaper.updateOne(
         {},
         {$addToSet : {"courses.$[c].semesters.$[s].subjects":subject}},
          {
            arrayFilters: [
              {
                "c.course": req.body.course
              },
              {
                "s.sem": parseInt(req.body.semester)
              }
            ]
          },
        function(err)
        {
            if(!err)
            {
                res.status(200).send("OK");
            }
            else
            {
                res.status(404).send(err);
                console.log(err);
            }
        }
        )
});

app.get('/insertQuestionPaperYear', async function(req, res)
{
    const year = new QYear({
        year : parseInt(req.body.year),
        pdfName : req.body.pdfName,
        pdfUrl : req.body.pdfUrl
    })
    await QuestionPaper.updateOne(
         {},
         {$addToSet : {"courses.$[c].semesters.$[s].subjects.$[sub].years":year}},
          {
            arrayFilters: [
              {
                "c.course": req.body.course
              },
              {
                "s.sem": parseInt(req.body.semester)
              },
              {
                "sub.subject": req.body.subject
              }
            ]
          },
        function(err)
        {
            if(!err)
            {
                res.status(200).send("OK");
            }
            else
            {
                res.status(404).send(err);
                console.log(err);
            }
        }
        )
});

app.put('/updateQuestionPaperCourse', async function(req, res)
{
    await QuestionPaper.updateOne(
        {"courses.course":req.body.OldCourseName},
        {$set : {"courses.$.course": req.body.NewCourseName}},
        function(err)
        {
            if(!err)
            {
                res.status(200).send("OK");
            }
            else
            {
                res.status(404).send("error");
            }
        }
        )
});

app.put('/updateQuestionPaperSemester', async function(req, res)
{
    await QuestionPaper.updateOne(
         {},
         {$set : {"courses.$[c].semesters.$[s].sem": parseInt(req.body.NewSemester)}},
          {
            arrayFilters: [
              {
                "c.course": req.body.course
              },
              {
                "s.sem": parseInt(req.body.OldSemester)
              }
            ]
          },
        function(err)
        {
            if(!err)
            {
                res.status(200).send("OK");
            }
            else
            {
                res.status(404).send(err);
                console.log(err);
            }
        }
        )
});

app.put('/updateQuestionPaperSubject', async function(req, res)
{
    await QuestionPaper.updateOne(
         {},
         {$set : {"courses.$[c].semesters.$[s].subjects.$[sub].subject": req.body.newSubject}},
          {
            arrayFilters: [
              {
                "c.course": req.body.course
              },
              {
                "s.sem": parseInt(req.body.semester)
              },
              {
                "sub.subject": req.body.oldSubject
              }
            ]
          },
        function(err)
        {
            if(!err)
            {
                res.status(200).send("OK");
            }
            else
            {
                res.status(404).send(err);
                console.log(err);
            }
        }
        )
});

app.put('/updateQuestionPaperYear', async function(req, res)
{
    await QuestionPaper.updateOne(
         {},
         {$set : {"courses.$[c].semesters.$[s].subjects.$[sub].years.$[y].year": req.body.newYear}},
          {
            arrayFilters: [
              {
                "c.course": req.body.course
              },
              {
                "s.sem": parseInt(req.body.semester)
              },
              {
                "sub.subject": req.body.subject
              },
              {
                "y.year":req.body.oldYear
              }
            ]
          },
        function(err)
        {
            if(!err)
            {
                res.status(200).send("OK");
            }
            else
            {
                res.status(404).send(err);
                console.log(err);
            }
        }
        )
});

app.put('/updateQuestionPaperPdfName', async function(req, res)
{
    await QuestionPaper.updateOne(
         {},
         {$set : {"courses.$[c].semesters.$[s].subjects.$[sub].years.$[y].pdfName": req.body.newPdfName}},
          {
            arrayFilters: [
              {
                "c.course": req.body.course
              },
              {
                "s.sem": parseInt(req.body.semester)
              },
              {
                "sub.subject": req.body.subject
              },
              {
                "y.year": parseInt(req.body.year)
              }
            ]
          },
        function(err)
        {
            if(!err)
            {
                res.status(200).send("OK");
            }
            else
            {
                res.status(404).send(err);
                console.log(err);
            }
        }
        )
});

app.put('/updateQuestionPaperPdfUrl', async function(req, res)
{
    await QuestionPaper.updateOne(
         {},
         {$set : {"courses.$[c].semesters.$[s].subjects.$[sub].years.$[y].pdfUrl": req.body.newPdfUrl}},
          {
            arrayFilters: [
              {
                "c.course": req.body.course
              },
              {
                "s.sem": parseInt(req.body.semester)
              },
              {
                "sub.subject": req.body.subject
              },
              {
                "y.year": parseInt(req.body.year)
              }
            ]
          },
        function(err)
        {
            if(!err)
            {
                res.status(200).send("OK");
            }
            else
            {
                res.status(404).send(err);
                console.log(err);
            }
        }
        )
});

app.delete('/deleteCourse', async function(req,res)
{
    await Padhlo.updateOne(
        {},
        {"$pull": {courses : {course : req.body.course}}},
        {multi : true},
        function(err)
        {
            if(!err)
            {
                res.status(200).send("OK");
            }
            else
            {
                res.status(404).send(err);
                console.log(err)
            }
        }
        )
});

app.delete('/deleteQuestionPaperCourse', async function(req,res)
{
    await QuestionPaper.updateOne(
        {},
        {"$pull": {courses : {course : req.body.course}}},
        {multi : true},
        function(err)
        {
            if(!err)
            {
                res.status(200).send("OK");
            }
            else
            {
                res.status(404).send(err);
                console.log(err)
            }
        }
        )
});


app.get('/courseData',async function(req, res)
{
   
    await Padhlo.aggregate([
        {$unwind:"$courses"},
        {$unwind:"$courses.semesters"},
        // {$unwind:"$courses.semesters.subjects"},
        {$project : {
        "_id":0,
        "__v" : 0,
        "courses._id" : 0,
        "courses.semesters._id" : 0 , 
        "courses.semesters.subjects._id": 0 , 
        "courses.semesters.subjects.units._id":0,
        "courses.semesters.subjects.units.topics._id" : 0,
    }},
        {$match:{"courses.course":req.body.course, "courses.semesters.sem": parseInt(req.body.semester)}}
    ], function(err,result)
    {
        if(!err)
        {
            res.send(result);
        }
        else
        {
            res.send("error");
        }
    })
    
});

app.get('/alldata',async function(req, res)
{
    await Padhlo.aggregate([
        // {$unwind:"$courses"},
        // {$unwind:"$courses.semesters"},
        // {$unwind:"$courses.semesters.subjects"},
        {$project : {
        "_id":0,
        "__v" : 0,
        "courses._id" : 0,
        "courses.semesters._id" : 0 , 
        "courses.semesters.subjects._id": 0 , 
        "courses.semesters.subjects.units._id":0,
        "courses.semesters.subjects.units.topics._id" : 0,
    }},

    ], function(err,result)
    {
        if(!err)
        {
            res.send(result);
        }
        else
        {
            res.send("error");
        }
    })
    
});

app.post('/semesters',async function(req, res)
{
    await Padhlo.aggregate([
        {$unwind:"$courses"},
        {$match:{"courses.course":req.body.course}},
        {$project : {
        "_id":0,
        "__v" : 0,
        "courses._id" : 0,
        "courses.semesters._id" : 0 , 
        "courses.semesters.subjects": 0}}
    ], function(err,result)
    {
        if(!err)
        {
            res.send(result);
        }
        else
        {
            res.send("error");
        }
    })
  
});

app.post('/courses',async function(req, res)
{
    await Padhlo.aggregate([
        {$project : {
            "_id":0,
            "__v" : 0,
            "courses._id" : 0,
            "courses.semesters": 0 ,
        }}
    ], function(err,result)
    {
        if(!err)
        {
            res.send(result);
        }
        else
        {
            res.send("error");
        }
    })
    
});

app.post('/subjects',async function(req, res)
{
   await Padhlo.aggregate([
        {$unwind:"$courses"},
        {$unwind:"$courses.semesters"},
        {$match:{"courses.course":req.body.course,"courses.semesters.sem":parseInt(req.body.semester)}},
        {$project : {
            "_id":0,
            "__v" : 0,
            "courses._id" : 0,
            "courses.semesters._id" : 0 , 
            "courses.semesters.subjects._id": 0 , 
            "courses.semesters.subjects.units": 0,
           
        }}
    ], function(err,result)
    {
        if(!err)
        {
            res.send(result);
        }
        else
        {
            res.send("error");
        }
    })
    
});

app.post('/units',async function(req, res)
{
    await Padhlo.aggregate([
        {$unwind:"$courses"},
        {$unwind:"$courses.semesters"},
        {$unwind:"$courses.semesters.subjects"},
        {$match:{"courses.course":req.body.course,
        "courses.semesters.sem":parseInt(req.body.semester) ,
        "courses.semesters.subjects.subject":req.body.subject}},
        {$project : {
            "_id":0,
            "__v" : 0,
            "courses._id" : 0,
            "courses.semesters._id" : 0 , 
            "courses.semesters.subjects._id": 0 , 
            "courses.semesters.subjects.units._id":0,
            "courses.semesters.subjects.units.topics":0,
        }}
    ], function(err,result)
    {
        if(!err)
        {
            res.send(result);
        }
        else
        {
            res.send("error");
        }
    })
    
});

app.post('/topics',async function(req, res)
{
    await Padhlo.aggregate([
        {$unwind:"$courses"},
        {$unwind:"$courses.semesters"},
        {$unwind:"$courses.semesters.subjects"},
        {$unwind:"$courses.semesters.subjects.units"},
        {$match:{"courses.course":req.body.course,
        "courses.semesters.sem":parseInt(req.body.semester),
        "courses.semesters.subjects.subject":req.body.subject,
        "courses.semesters.subjects.units.unit": parseInt(req.body.unit)}},
        {$project : {
            "_id":0,
            "__v" : 0,
            "courses._id" : 0,
            "courses.semesters._id" : 0 , 
            "courses.semesters.subjects._id": 0 , 
            "courses.semesters.subjects.units._id":0,
            "courses.semesters.subjects.units.topics._id":0,
        }}
    ], function(err,result)
    {
        if(!err)
        {
            res.send(result);
        }
        else
        {
            res.send("error");
        }
    })
   
});

app.get('/all',function(req, res)
{
    Padhlo.find({},
    function(err, courses){
        if(!err)
        {
            res.send(courses);
        }
        else
        {
            res.send(err);
        }
    })
});

app.get('/allQuestionPaper',function(req, res)
{
    QuestionPaper.find({},
    function(err, courses){
        if(!err)
        {
            res.send(courses);
        }
        else
        {
            res.send(err);
        }
    })
});

app.get('/allDataQuestionPaper',async function(req, res)
{
    await QuestionPaper.aggregate([
        // {$unwind:"$courses"},
        // {$unwind:"$courses.semesters"},
        // {$unwind:"$courses.semesters.subjects"},
        {$project : {
        "_id":0,
        "__v" : 0,
        "courses._id" : 0,
        "courses.semesters._id" : 0 , 
        "courses.semesters.subjects._id": 0 , 
        "courses.semesters.subjects.years_id":0,
    }},

    ], function(err,result)
    {
        if(!err)
        {
            res.send(result);
        }
        else
        {
            res.send("error");
        }
    })
    
});



app.post('/questionPaperYears',async function(req, res)
{
    await QuestionPaper.aggregate([
        {$unwind:"$courses"},
        {$unwind:"$courses.semesters"},
        {$unwind:"$courses.semesters.subjects"},
        {$match:{"courses.course":req.body.course,
        "courses.semesters.sem":parseInt(req.body.semester) ,
        "courses.semesters.subjects.subject":req.body.subject}},
        {$project : {
            "_id":0,
            "__v" : 0,
            "courses._id" : 0,
            "courses.semesters._id" : 0 , 
            "courses.semesters.subjects._id": 0 , 
            "courses.semesters.subjects.years._id":0,
        }}
    ], function(err,result)
    {
        if(!err)
        {
            res.send(result);
        }
        else
        {
            res.send("error");
        }
    })

});



app.post('/questionPaperSubjects',async function(req, res)
{
   await QuestionPaper.aggregate([
        {$unwind:"$courses"},
        {$unwind:"$courses.semesters"},
        {$match:{"courses.course":req.body.course,"courses.semesters.sem":parseInt(req.body.semester)}},
        {$project : {
            "_id":0,
            "__v" : 0,
            "courses._id" : 0,
            "courses.semesters._id" : 0 , 
            "courses.semesters.subjects._id": 0 , 
            "courses.semesters.subjects.years": 0,

        }}
    ], function(err,result)
    {
        if(!err)
        {
            res.send(result);
        }
        else
        {
            res.send("error");
        }
    })

});



app.post('/questionPaperSemesters',async function(req, res)
{
    await QuestionPaper.aggregate([
        {$unwind:"$courses"},
        {$match:{"courses.course":req.body.course}},
        {$project : {
        "_id":0,
        "__v" : 0,
        "courses._id" : 0,
        "courses.semesters._id" : 0 , 
        "courses.semesters.subjects": 0}}
    ], function(err,result)
    {
        if(!err)
        {
            res.send(result);
        }
        else
        {
            res.send("error");
        }
    })

});


app.post('/questionPaperCourses',async function(req, res)
{
    await QuestionPaper.aggregate([
        {$project : {
            "_id":0,
            "__v" : 0,
            "courses._id" : 0,
            "courses.semesters": 0 ,
        }}
    ], function(err,result)
    {
        if(!err)
        {
            res.send(result);
        }
        else
        {
            res.send("error");
        }
    })

});


app.get('/serverStatus',function(req,res)
{
    return res.send(serverStatus);
});

app.post('/changeServerStatus',function(req, res)
{
    if(process.env.DB_STATUS_CHANGE_PASSWORD == req.body.password && req.body.statusChange == 'true')
    {
      serverStatus = true;
      return res.send(serverStatus);
    }
    else if(process.env.DB_STATUS_CHANGE_PASSWORD == req.body.password && req.body.statusChange == 'false')
    {
      serverStatus = false;
      return res.send(serverStatus);
    }
    else
    {
      res.status(401);
      res.send("ERROR")
    }
    
});
