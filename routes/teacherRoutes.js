const express = require('express');
const { Teacher, Department } = require('../models');
const fs = require('fs');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });


let resCreate;
// Додавання нового запису
router.post('/create', upload.single('Image'), async (req, res) => {
    try {
        let result, im;
        const { ID_Teacher, Name, Surname, Phone, ID_Department } = req.body;
        const Image = fs.readFileSync(req.file.path);

        if (!Number.isInteger(parseInt(ID_Teacher)) || !Number.isInteger(parseInt(ID_Department))) {
            return res.status(400).render('TeacherResC.hbs', { ok: false, err: true, text: 'ID must be an integer.' });
        }
        if (parseInt(ID_Teacher) <= 0) {
            return res.status(400).render('TeacherResC.hbs', { ok: false, err: true, text: 'ID_Teacher must be positive.' });
        }
        const existingTeacher = await Teacher.findOne({ ID_Teacher: ID_Teacher });
        const existingDepartment = await Department.findOne({ ID_Department: ID_Department });
        if (existingTeacher) {
            res.status(400).render('TeacherResC.hbs', { ok: false, err: true, text: 'Teacher with this ID already exists' });
        } else if (!existingDepartment) {
            res.status(400).render('TeacherResC.hbs', { ok: false, err: true, text: 'This ID_Department not found' });
        } else {
            const teacher = new Teacher({
                ID_Teacher: ID_Teacher,
                Name: Name,
                Surname: Surname,
                Phone: Phone,
                ID_Department: ID_Department,
                Image: Image
            });
            result = await teacher.save();
            im = result.Image.toString('base64');
            resCreate = result;
            res.status(200).render('TeacherResC.hbs', { result: result, im: im, ok: true, err: false });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/TeacherResC/create', async (req, res) => {
    try {
        res.status(200).json(resCreate);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Отримання записів
router.get('/', async (req, res) => {
    try {
        const teacherData = [];
        let result;

        if (req.query.id) {
            if (parseInt(req.query.id) <= 0) {
                return res.status(400).render('TeacherResRI.hbs', { ok: false, err: true, text: 'ID must be positive.' });
            }
            // Отримання запису за ID
            result = await Teacher.findOne({ ID_Teacher: req.query.id });
            if (result) {
                let im;
                if (result.Image) {
                    im = result.Image.toString('base64');
                } else {
                    const defaultImage = fs.readFileSync(__dirname + '/default.png');
                    im = defaultImage.toString('base64');
                }
                res.status(200).render('TeacherResRI.hbs', { result: result, im: im, ok: true, err: false });
            } else {
                res.status(400).render('TeacherResRI.hbs', { ok: false, err: true, text: 'Nothing found.' });
            }
        } else {
            // Отримання всіх записів
            const teachers = await Teacher.find();
            for (const element of teachers) {
                let im;
                if (element.Image) {
                    im = element.Image.toString('base64');
                } else {
                    const defaultImage = fs.readFileSync(__dirname + '/default.png');
                    im = defaultImage.toString('base64');
                }
                const data = { ...element.toObject(), Image: im };
                teacherData.push(data);
            }
        }
        if (req.originalUrl.includes('/api/TeacherResRA')) {
            res.status(200).json(teacherData);
        }
        else if (req.originalUrl.includes('/api/TeacherResRI')) {
            res.status(200).json(result);
        } else if (!req.query.id) {
            res.status(200).render('TeacherResRA.hbs', { teachers: teacherData });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

let resUpdate;
// Редагування запису за ID
router.post('/update', upload.single('Image'), async (req, res) => {
    try {
        const { ID_Department } = req.body;
        if (!Number.isInteger(parseInt(req.body.id))) {
            return res.status(400).render('TeacherResU.hbs', { ok: false, err: true, text: 'ID must be an integer.' });
        }
        if (parseInt(req.body.id) <= 0) {
            return res.status(400).render('TeacherResU.hbs', { ok: false, err: true, text: 'ID must be positive.' });
        }
        if (!Number.isInteger(parseInt(ID_Department))) {
            return res.status(400).render('TeacherResU.hbs', { ok: false, err: true, text: 'ID_Department must be an integer.' });
        }
        let imageData = fs.readFileSync(req.file.path);
        const result = await Teacher.findOneAndUpdate({ ID_Teacher: req.body.id }, { ...req.body, Image: imageData }, { new: true });
        if (result) {
            resUpdate = result;
            const im = result.Image.toString('base64');
            res.status(200).render('TeacherResU.hbs', { result: result, im: im, ok: true, err: false });
        } else {
            res.status(400).render('TeacherResU.hbs', { ok: false, err: true, text: 'Teacher with this ID doesn`t exist' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/TeacherResU/update', async (req, res) => {
    try {
        res.status(200).json(resUpdate);
    } catch (error) {
        res.status(400).send(error);
    }
})

let resDelete;
// Видалення запису за ID
router.post('/delete', async (req, res) => {
    try {
        if (parseInt(req.body.id) <= 0) {
            return res.status(400).render('TeacherResD.hbs', { ok: false, err: true, text: 'ID must be positive.' });
        }
        const result = await Teacher.findOneAndDelete({ ID_Teacher: req.body.id });
        if (!result) {
            res.status(404).render('TeacherResD.hbs', { ok: false, err: true, text: 'Teacher not found.' });
        } else {
            resDelete = result;
            const im = result.Image.toString('base64');
            res.status(200).render('TeacherResD.hbs', { result: result, im: im, ok: true, err: false });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/TeacherResD/delete', async (req, res) => {
    try {
        res.status(200).json(resDelete);
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;
