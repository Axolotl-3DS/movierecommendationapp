const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const loginController = {};

loginController.createUser = async (req, res, next) => {
  try {
    // console.log('req.body', req.body);
    const newUser = await User.create(req.body);
    // res.redirect('/home'); // pretty sure this is illegal
    res.locals.newUser = newUser;
    return next();
  } catch (err) {
    console.log(`Error on loginController.createUser: ${err}`);
    res.send('User already exists');
  }
};

loginController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    await User.findOne({ username }, (err, user) => {
      // console.log('checking password');
      const isValid = bcrypt.compareSync(password, user.password);
      if (!user || !isValid) return res.send('Invalid Username or Password');
      else {
        // console.log('password is gooda');
        res.locals.id = user._id;
        return next();
      }
    });
  } catch (err) {
    res.send('Invalid Username or Password');
  }
};

module.exports = loginController;
