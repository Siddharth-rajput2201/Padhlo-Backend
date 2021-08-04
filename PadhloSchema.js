const mongoose = require('mongoose');

const TopicSchema = mongoose.Schema({
    topic : String,
    youtubeUrl : String,
    pdfName : String,
    pdfUrl : String,
});

const UnitSchema = mongoose.Schema({
    unit : {
        type : Number,
        unique : true,
    },
    pdfName : String,
    pdfUrl : String,
    topics  : {
        type : [TopicSchema],
        unique : true,
    },
});

const SubjectSchema = mongoose.Schema({
    subject : String,
    units : {
        type : [UnitSchema],
        unique : true,
    }
});

const SemesterSchema  = mongoose.Schema({
    sem : {
        type : Number,
        unique : true,
    },
    subjects : {
        type : [SubjectSchema],
        unique : true,
    }
});

const CourseSchema = mongoose.Schema({
    course : {
        type : String,
        unique: true,
    },
    semesters : {
        type : [SemesterSchema] ,
        unique : true,
    }
});

const PadhloSchema = mongoose.Schema({
    courses : {
        type : [CourseSchema],
        unique : true,
    }
});
// const PadhloSchema = mongoose.Schema({
//   courses : [
//    {
//     course : String,
//     semester : [
//         {
//             sem : Number,
//             subjects : [
//                 {
//                     subject : String,
//                     units : [
//                         {
//                             unit : Number,
//                             unitPdfData : Buffer,
//                             topics :[
//                                {
//                                    topic : String,
//                                    topicPdfData : Buffer,
//                                }
//                             ]
//                         }
//                     ]
//                 }
//             ]
//         }
//     ]
//     }
// ]
// })
const Padhlo = mongoose.model("Padhlo",PadhloSchema);
const Course = mongoose.model("Course",CourseSchema);
const Semester = mongoose.model("Semester",SemesterSchema);
const Subject = mongoose.model("Subject",SubjectSchema);
const Unit = mongoose.model("Unit",UnitSchema);
const Topic = mongoose.model("Topic",TopicSchema);
module.exports = {
    Padhlo,Course,Semester,Subject,Unit,Topic
};
// module.exports = {CourseSchema,SemesterSchema,SubjectSchema,UnitSchema,TopicSchema,PadhloSchema};
// module.exports = mongoose.model("Course",CourseSchema);
// module.exports = mongoose.model("Semester",SemesterSchema);
// module.exports = mongoose.model("Subject",SubjectSchema);
// module.exports = mongoose.model("Unit",UnitSchema);
// module.exports = mongoose.model("Topic",TopicSchema);

// module.exports = SemesterSchema;
// module.exports = SubjectSchema;
// module.exports = UnitSchema;
// module.exports = TopicSchema;