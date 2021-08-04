const axios = require("axios");
const movieController = {};
const User = require("../models/userModel");
const dotenv = require("dotenv").config();

movieController.getUserInput = async (req, res, next) => {
  res.locals.input = req.body.title;
  console.log(res.locals.input);
  return next();
};

movieController.getRecommendations = (req, res, next) => {
  // newAPI get recommendations https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=<<api_key>>&language=en-US&page=1
  console.log("get recommendations", process.env.TMDB);
  const movieRecommendations = [];
  const simonPromise = new Promise((resolve, reject) => {
    resolve(
      axios(
        `https://api.themoviedb.org/3/movie/299534/recommendations?api_key=${process.env.TMDB}&language=en-US&page=1`
      )
    );
  });

  simonPromise
    .then((result) => {
      for (let i = 0; i < 20; i++) {
        const { title, id, poster_path, overview } = result.data.results[i];
        movieRecommendations.push({
          id,
          title,
          overview,
          poster_path: `https://image.tmdb.org/t/p/w500/${poster_path}`,
        });
      }
      // console.log(movieRecommendations);
      res.locals.recommendations = movieRecommendations;
      return next();
    })
    .catch((err) =>
      next({
        log: `Error :${err}`,
        message: "error occured in getFavs",
      })
    );

  // try {
  //     const results = await axios('https://tastedive.com/api/similar?q=thor&type=movie');
  //     console.log(results.data.Similar)
  //     res.locals.movies = results.data.Similar;
  //     return next();

  // } catch(err) {
  //     console.log('Error at getRecommendations');
  // }
};

movieController.getFavs = async (req, res, next) => {
  // try {
  //   const results = await axios(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB}&query=Avengers`);
  //   // https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher
  //   // console.log(results.data.results);
  //   // const favs = results.data.results[0].original_title;
  //   res.locals.getFavs = results.data.results;
  //   return next();
  // } catch(err) {
  //   console.log('Error at getFavs');
  // }
  const movieRecommendations = [];
  console.log("favs", process.env.TMDB);
  const simonPromise = new Promise((resolve, reject) => {
    resolve(
      axios(
        `https://api.themoviedb.org/3/movie/299534/recommendations?api_key=${process.env.TMDB}&language=en-US&page=1`
      )
    );
  });

  simonPromise
    .then((result) => {
      for (let i = 0; i < 20; i++) {
        const { title, id, poster_path, overview } = result.data.results[i];
        movieRecommendations.push({
          id,
          title,
          overview,
          poster_path: `https://image.tmdb.org/t/p/w500/${poster_path}`,
        });
      }
      res.locals.favs = movieRecommendations.reverse();
      return next();
    })
    .catch((err) =>
      next({
        log: `Error :${err}`,
        message: "error occured in getFavs",
      })
    );
};

movieController.getSearch = (req, res, next) => {
  // https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher
  console.log("api call hits getSearch middleware");
  const searchArray = [];
  // Check if no title has been provided
  if (!req.body.title) {
    console.log("No search params");
  }
  const searchPromise = new Promise((resolve, reject) => {
    resolve(
      axios(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMBD}&query=${req.body.title}`
      )
    );
  });
  searchPromise
    .then((response) => {
      console.log("hits movie api and receives data");
      for (let i = 0; i < 6; i++) {
        const { title, id, poster_path, overview } = response.data.results[i];
        searchArray.push({
          id,
          title,
          overview,
          poster_path: `https://image.tmdb.org/t/p/w500/${poster_path}`,
        });
      }
      res.locals.searchResults = searchArray;
      return next();
    })
    .catch((err) =>
      next({
        log: `Error :${err}`,
        message: "error occured in getFavs",
      })
    );
};

movieController.getMovieInfo = async (req, res, next) => {
  // If movie is clicked show info
  // https://api.themoviedb.org/3/movie/343611?api_key={api_key}
};

module.exports = movieController;
