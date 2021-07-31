const axios = require('axios');
const movieController = {};


movieController.getUserInput = async (req, res, next) => {
    res.locals.input = 'thor'
    return next();
} 

movieController.getRecommendations = async (req, res, next) => {

  const simonPromise = new Promise((resolve, reject) => {
      resolve(axios('https://tastedive.com/api/similar?q=thor&type=movie'));
  })
  `https://tastedive.com/api/similar?q=${res.locals.input}&type=movie`
  simonPromise
    .then( results => {
        res.locals.movies = results.data.Similar;
        return next();
    })
    .catch(err => console.log('Error at getRecommendations'))
  
    // try {
    //     const results = await axios('https://tastedive.com/api/similar?q=thor&type=movie');
    //     console.log(results.data.Similar)
    //     res.locals.movies = results.data.Similar;
    //     return next();

    // } catch(err) {
    //     console.log('Error at getRecommendations');
    // }


}

module.exports = movieController;