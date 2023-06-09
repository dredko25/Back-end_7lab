const express = require('express');
const { Department, Faculty } = require('../models');

const router = express.Router();

let resCreate;
// Додавання нового запису
router.post('/create', async (req, res) => {
    try {
        const { ID_Department, Name, Description, ID_Faculty } = req.body;
        if (!Number.isInteger(parseInt(ID_Department)) || !Number.isInteger(parseInt(ID_Faculty))) {
            return res.status(400).render('DepartmentResC.hbs', { ok: false, err: true, text: 'ID must be an integer.'});
        }
        if (parseInt(ID_Department) <= 0) {
            return res.status(400).render('DepartmentResC.hbs', { ok: false, err: true, text: 'ID must be positive.' });
        }
        const existingDepartment = await Department.findOne({ ID_Department: ID_Department });
        const existingFaculty = await Faculty.findOne({ ID_Faculty: parseInt(ID_Faculty) });
        if (existingDepartment) {
            res.status(400).render('DepartmentResC.hbs', { ok: false, err: true, text: 'Department with this ID already exists'});
        } else if (existingFaculty === null) {
            res.status(400).render('DepartmentResC.hbs', { ok: false, err: true, text: 'This ID_Faculty not found' });
        } else {
            const department = new Department({
                ID_Department: ID_Department,
                Name: Name,
                Description: Description,
                ID_Faculty: ID_Faculty
            });

            const result = await department.save();
            resCreate = result;
            res.status(200).render('DepartmentResC.hbs', { result: result, ok: true, err: false });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/DepartmentResC/create', async (req, res) => {
    try {
        res.status(200).json(resCreate);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Отримання записів
router.get('/', async (req, res) => {
    try {
        let departments, result;
        if (req.query.id) {
            if (parseInt(req.query.id) <= 0) {
                return res.status(400).render('DepartmentResRI.hbs', { ok: false, err: true, text: 'ID must be positive.' });
            }
            // Отримання запису за ID
            result = await Department.findOne({ ID_Department: req.query.id });
            if (result) {
                res.status(200).render('DepartmentResRI.hbs', { result: result, ok: true, err: false });
            } else {
                res.status(400).render('DepartmentResRI.hbs', { ok: false, err: true, text: 'Nothing found.' });
            }
        } else {
            // Отримання всіх записів
            departments = await Department.find();
        }
        if (req.originalUrl.includes('/api/DepartmentResRA')) {
            res.status(200).json(departments);
        } 
        else if (req.originalUrl.includes('/api/DepartmentResRI')) {
            res.status(200).json(result);
        } else if (!req.query.id){
            res.status(200).render('DepartmentResRA.hbs', { departments: departments });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

let resUpdate;
// Редагування запису за ID
router.post('/update', async (req, res) => {
    try {
        if (parseInt(req.body.id) <= 0) {
            return res.status(400).render('DepartmentResU.hbs', { ok: false, err: true, text: 'ID must be positive.' });
        }
        const result = await Department.findOneAndUpdate({ ID_Department: req.body.id }, req.body, { new: true });
        if (result) {
            resUpdate = result;
            res.status(200).render('DepartmentResU.hbs', { result: result, ok: true, err: false });
        } else {
            res.status(400).render('DepartmentResU.hbs', { ok: false, err: true, text: 'Department with this ID doesn`t exist.' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/DepartmentResU/update', async (req, res) => {
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
            return res.status(400).render('DepartmentResD.hbs', { ok: false, err: true, text: 'ID must be positive.' });
        }
        const result = await Department.findOneAndDelete({ ID_Department: req.body.id });
        if (!result) {
            res.status(404).render('DepartmentResD.hbs', { ok: false, err: true, text: 'Department not found' });
        } else {
            resDelete = result;
            res.status(200).render('DepartmentResD.hbs', { result: result, ok: true, err: false });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/DepartmentResD/delete', async (req, res) => {
    try {
        res.status(200).json(resDelete);
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;
