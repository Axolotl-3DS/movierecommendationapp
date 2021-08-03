const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/', movieController.getUserInput, movieController.getRecommendations, movieController.getFavs, (req, res) => res.status(200).json(res.locals));
router.post('/search', movieController.getSearch, (req, res) => res.status(200).json(res.locals));

module.exports = router;

