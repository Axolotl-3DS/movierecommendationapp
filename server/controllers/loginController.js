const User = require('../models/userModel');


const loginController = {};

loginController.createUser = async (req, res, next) => {
    try { 
      // console.log('req.body', req.body);
      const newUser = await User.create(req.body);
      // res.redirect('/home'); // pretty sure this is illegal
    } catch(err) {
        res.send('User already exists')
    };

};

loginController.verifyUser = async (req, res, next) => {
    const { username, password } = req.body;
    try {
      await User.findOne({username}, (err, user) => {
        if (!user || user.password !== password) res.send('Invalid Username or Password');
        else {
          res.locals.id = user._id;
          return next();
        }
      })
    } catch(err) {
      res.send('Invalid Username or Password');
    }
  
   
};

module.exports = loginController;