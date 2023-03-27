const express = require('express');
const { Faculty } = require('../models');

const router = express.Router();

// Додавання нового запису
router.post('/create', async (req, res) => {
    try {
        const { ID_Faculty, Name, Description } = req.body;
        if (!Number.isInteger(parseInt(ID_Faculty))) {
            return res.status(400).render('FacultyResC.hbs', {ok: false, err: true, text:'ID must be an integer.' });
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
            res.status(200).render('FacultyResC.hbs', { result: result, ok: true, err: false });

        }
    } catch (error) {
        res.status(400).send(error);
    }
});

// Отримання всіх записів
router.get('/', async (req, res) => {
    try {
        const faculties = await Faculty.find();
        if (req.query.id) {
            // Отримання запису за ID
            const result = await Faculty.findOne({ ID_Faculty: req.query.id });
            if (result) {
                res.status(200).render('FacultyResRI.hbs', { result: result, ok: true, err: false });
            } else {
                res.status(400).render('FacultyResRI.hbs', { ok: false, err: true, text: 'Nothing found.' });
            }
        } else {
            res.status(200).render('FacultyResRA.hbs', { faculties: faculties });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

// Редагування запису за ID
router.post('/update', async (req, res) => {
    try {
        if (!Number.isInteger(parseInt(req.body.id))) {
            return res.status(400).send('ID must be an integer.');
        }
        const result = await Faculty.findOneAndUpdate({ ID_Faculty: req.body.id }, req.body, { new: true });
        if (result) {
            res.status(200).render('FacultyResU.hbs', { result: result, ok: true, err: false });
        } else {
            res.status(400).render('FacultyResU.hbs', { ok: false, err: true, text: 'Faculty with this ID doesn`t exist' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});


// Видалення запису за ID
router.post('/delete', async (req, res) => {
    try {
        if (!Number.isInteger(parseInt(req.body.id))) {
            return res.status(400).send('ID must be an integer.');
        }
        const result = await Faculty.findOneAndDelete({ ID_Faculty: req.body.id });
        if (!result) {
            res.status(404).render('FacultyResD.hbs', { ok: false, err: true, text: 'Faculty with this ID doesn`t exist' });
        } else {
            res.status(200).render('FacultyResD.hbs', { result: result, ok: true, err: false });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
