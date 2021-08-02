const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/', movieController.getUserInput, movieController.getRecommendations, movieController.getFavs, (req, res) => res.status(200).json(res.locals));
//router.get('/', movieController.getUserInput, movieController.getRecommendations, movieController.getFavs, (req, res) => res.status(200).json(res.locals.recommendations));

module.exports = router;

