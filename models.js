const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dredko25:gY7bukFt4hcGxBc4@cluster0.xs1ymu3.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error(error));

const facultySchema = new mongoose.Schema({
    ID_Faculty: Number,
    Name: String,
    Description: String
});

const Faculty = mongoose.model('Faculty', facultySchema);

const departmentSchema = new mongoose.Schema({
    ID_Department: Number,
    Name: String,
    Description: String,
    ID_Faculty: Number
});

const Department = mongoose.model('Department', departmentSchema);

const teacherSchema = new mongoose.Schema({
    ID_Teacher: Number,
    Name: String,
    Surname: String,
    Phone: String,
    ID_Department: Number,
    Image: Buffer
});

const Teacher = mongoose.model('Teacher', teacherSchema);


module.exports.Faculty = Faculty;
module.exports.Department = Department;
module.exports.Teacher = Teacher;
