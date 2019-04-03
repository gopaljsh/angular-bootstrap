const mongoose = require('mongoose');
const express = require('express');

const Resume = require('../models/resume');

const router = express.Router();

router.post('/resume/post', (req, res, next) => {
    const resume = new Resume({
        resumedata: req.body.resumedata
    });

    resume.save().then(resumeCreated => {
        res.status(200).json({
            message: 'resume created successfull'
        });
    });
});

router.get('/resume', (req, res, next) => {
    Resume.find().then(resume => {
        res.status(200).json({
            resume: resume 
        });
    });
});

module.exports = router;

