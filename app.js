const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');

const facultyRoutes = require('./routes/facultyRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');

const app = express();
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// головна сторінка
app.get('/', (req, res) => {
    res.render('index.hbs');
})

// роутінг для проміжної сторінки вибору
app.get('/faculty', (req, res) => {
    res.render('Choose.hbs', { flag: "Faculty" });
})
app.get('/department', (req, res) => {
    res.render('Choose.hbs', { flag: "Department" });
})
app.get('/teacher', (req, res) => {
    res.render('Choose.hbs', { flag: "Teacher" });
})

//роутінг для Факультетів
// create
app.get('/FacultyResC', (req, res) => {
    res.render('FacultyResC.hbs');
})
app.use('/FacultyResC', facultyRoutes);
// read all
app.use('/FacultyResRA', facultyRoutes);
app.get('/FacultyResRA', (req, res) => {
    res.render('FacultyResRA.hbs');
})
// read id
app.use('/FacultyResRI/result', facultyRoutes);
app.get('/FacultyResRI', (req, res) => {
    res.render('FacultyResRI.hbs');
})
// update
app.get('/FacultyResU', (req, res) => {
    res.render('FacultyResU.hbs');
})
app.use('/FacultyResU', facultyRoutes);
// delete
app.get('/FacultyResD', (req, res) => {
    res.render('FacultyResD.hbs');
})
app.use('/FacultyResD', facultyRoutes);

//роутінг для Departments
// create
app.get('/DepartmentResC', (req, res) => {
    res.render('DepartmentResC.hbs');
})
app.use('/DepartmentResC', departmentRoutes);
// read all
app.use('/DepartmentResRA', departmentRoutes);
app.get('/DepartmentResRA', (req, res) => {
    res.render('DepartmentResRA.hbs');
})
// read id
app.use('/DepartmentResRI/result', departmentRoutes);
app.get('/DepartmentResRI', (req, res) => {
    res.render('DepartmentResRI.hbs');
})
// update
app.get('/DepartmentResU', (req, res) => {
    res.render('DepartmentResU.hbs');
})
app.use('/DepartmentResU', departmentRoutes);
// delete
app.get('/DepartmentResD', (req, res) => {
    res.render('DepartmentResD.hbs');
})
app.use('/DepartmentResD', departmentRoutes);

//роутінг для Teachers
// create
app.get('/TeacherResC', (req, res) => {
    res.render('TeacherResC.hbs');
})
app.use('/TeacherResC', teacherRoutes);
// read all
app.use('/TeacherResRA', teacherRoutes);
app.get('/TeacherResRA', (req, res) => {
    res.render('TeacherResRA.hbs');
})
// read id
app.use('/TeacherResRI/result', teacherRoutes);
app.get('/TeacherResRI', (req, res) => {
    res.render('TeacherResRI.hbs');
})
// update
app.get('/TeacherResU', (req, res) => {
    res.render('TeacherResU.hbs');
})
app.use('/TeacherResU', teacherRoutes);
// delete
app.get('/TeacherResD', (req, res) => {
    res.render('TeacherResD.hbs');
})
app.use('/TeacherResD', teacherRoutes);


app.use('/api/TeacherResRA', teacherRoutes);
app.use('/api/TeacherResRI/result', teacherRoutes);

app.use('/api/DepartmentResRA', departmentRoutes);
app.use('/api/DepartmentResRI/result', departmentRoutes);

app.use('/api/FacultyResRA', facultyRoutes);
app.use('/api/FacultyResRI/result', facultyRoutes);

app.use('/api', teacherRoutes);
app.use('/api', facultyRoutes);
app.use('/api', departmentRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

