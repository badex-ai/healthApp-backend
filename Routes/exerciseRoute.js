const express = require('express');
const exerciseController = require('../controllers/exerciseController')


const router = express.Router()

 router.get('/', exerciseController.getAllExercises)

 module.exports= router