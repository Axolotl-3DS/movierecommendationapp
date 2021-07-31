const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/', movieController.getRecommendations, (req, res) => res.status(200).json(res.locals.movies));

module.exports = router;