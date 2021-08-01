const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.get('/', (req, res) => res.status(200).send('login route is working'));
router.post('/', loginController.verifyUser, (req, res) => res.status(200).redirect('/home'));
router.post('/signup', loginController.createUser, (req, res) => res.status(200).json(res.locals.id));


module.exports = router;