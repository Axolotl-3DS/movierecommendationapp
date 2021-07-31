const axios = require('axios');
const movieController = {};
const User = require('../models/userModel');
const dotenv = require('dotenv').config();

movieController.getUserInput = async (req, res, next) => {
    res.locals.input = req.body.title
    return next();
} 

movieController.getFavs = async (req, res, next) => {
  try {
    const results = await axios(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB}&query=Avengers`);
    // https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher
    console.log(results.data.results);
    // const favs = results.data.results[0].original_title;
    res.locals.getFavs = results.data.results;
    return next();
  } catch(err) {
    console.log('Error at getFavs');
  }
  
}

movieController.getMovieInfo = async (req, res, next) => {
  // https://api.themoviedb.org/3/movie/343611?api_key={api_key}
}

movieController.getRecommendations = async (req, res, next) => {

  const simonPromise = new Promise((resolve, reject) => {
      resolve(axios(`https://tastedive.com/api/similar?q=${res.locals.input}&type=movie`));
  })
  
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