const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/', movieController.getUserInput, movieController.getRecommendations, movieController.getFavs, (req, res) => res.status(200).json(res.locals.getFavs));

module.exports = router;

