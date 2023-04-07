const express = require('express');
const { Faculty } = require('../models');

const router = express.Router();

let resCreate;
// Додавання нового запису
router.post('/create', async (req, res) => {
    try {
        const { ID_Faculty, Name, Description } = req.body;
        if (parseInt(ID_Faculty) <= 0) {
            return res.status(400).render('FacultyResC.hbs', {ok: false, err: true, text:'ID must be positive.' });
        }
        const existingFaculty = await Faculty.findOne({ ID_Faculty: ID_Faculty });
        if (existingFaculty) {
            res.status(400).render('FacultyResC.hbs', {ok: false, err: true, text:'Faculty with this ID already exists.' });
        } else {
            const faculty = new Faculty({
                ID_Faculty: ID_Faculty,
                Name: Name,
                Description: Description
            });

            const result = await faculty.save();
            resCreate = result;
            res.status(200).render('FacultyResC.hbs', { result: result, ok: true, err: false });

        }
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/FacultyResC/create', async (req, res) => {
    try {
        res.status(200).json(resCreate);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Отримання всіх записів
router.get('/', async (req, res) => {
    try {
        const faculties = await Faculty.find();
        let result;
        if (req.query.id) {
            if (parseInt(req.query.id) <= 0) {
                return res.status(400).render('FacultyResRI.hbs', { ok: false, err: true, text: 'ID must be positive.' });
            }
            // Отримання запису за ID
            result = await Faculty.findOne({ ID_Faculty: req.query.id });
            if (result) {
                res.status(200).render('FacultyResRI.hbs', { result: result, ok: true, err: false });
            } else {
                res.status(400).render('FacultyResRI.hbs', { ok: false, err: true, text: 'Nothing found.' });
            }
        }
        if (req.originalUrl.includes('/api/FacultyResRA')) {
            res.status(200).json(faculties);
        } 
        else if (req.originalUrl.includes('/api/FacultyResRI')) {
            res.status(200).json(result);
        } else if (!req.query.id){
            res.status(200).render('FacultyResRA.hbs', { faculties: faculties });
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
            return res.status(400).render('FacultyResU.hbs', { ok: false, err: true, text: 'ID must be an positive.' });
        }
        const result = await Faculty.findOneAndUpdate({ ID_Faculty: req.body.id }, req.body, { new: true });
        if (result) {
            resUpdate = result;
            res.status(200).render('FacultyResU.hbs', { result: result, ok: true, err: false });
        } else {
            res.status(400).render('FacultyResU.hbs', { ok: false, err: true, text: 'Faculty with this ID doesn`t exist' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/FacultyResU/update', async (req, res) => {
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
            return res.status(400).render('FacultyResD.hbs', { ok: false, err: true, text: 'ID must be positive.' });
        }
        const result = await Faculty.findOneAndDelete({ ID_Faculty: req.body.id });
        if (!result) {
            res.status(404).render('FacultyResD.hbs', { ok: false, err: true, text: 'Faculty with this ID doesn`t exist' });
        } else {
            resDelete = result;
            res.status(200).render('FacultyResD.hbs', { result: result, ok: true, err: false });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/FacultyResD/delete', async (req, res) => {
    try {
        res.status(200).json(resDelete);
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;
