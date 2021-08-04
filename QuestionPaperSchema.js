const mongoose = require('mongoose');

const YearSchema = mongoose.Schema({
    year : {
        type : Number,
        unique : true,
    },
    pdfName : String,
    pdfUrl : String,
});

const SubjectSchema = mongoose.Schema({
    subject : String,
    years : {
        type : [YearSchema],
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

const QuestionPaperSchema = mongoose.Schema({
    courses : {
        type : [CourseSchema],
        unique : true,
    }
});

const QuestionPaper = mongoose.model("QuestionPaper",QuestionPaperSchema);
const QCourse = mongoose.model("QCourse",CourseSchema);
const QSemester = mongoose.model("QSemester",SemesterSchema);
const QSubject = mongoose.model("QSubject",SubjectSchema);
const QYear = mongoose.model("QYear",YearSchema);

module.exports = {
    QuestionPaper,QCourse,QSemester,QSubject,QYear
};