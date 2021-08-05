const axios = require("axios");
const movieController = {};
const User = require("../models/userModel");
const dotenv = require("dotenv").config();

movieController.getUserInput = async (req, res, next) => {
  res.locals.input = req.body.title;
  console.log(res.locals.input);
  return next();
};

movieController.getRecs = async (req, res, next) => {
  // https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=<<api_key>>&language=en-US&page=1

  const { username } = req.body;
  // get fav movie IDs from database
  // await User.findOne({ username }, (err, user) => {
  //   const favsList = user.favorites;
  // });

  const movieList = ['1726'];
  // for each fav movie, get the top 5 recommended
  const recsArray = [];
  for (let i = 0; i < movieList.length; i++ ){
    const response = await axios(`https://api.themoviedb.org/3/movie/${movieList[i]}/recommendations?api_key=${process.env.TMBD}&language=en-US&page=1}`);
    // pull out results = array of objects
    const recs = response.data.results;
    // push the first 5 recs into recsArray
    // remove duplicates before storing in res.locals
    const idCheck = {};
    for (let i = 0; i < 5; i++) {
      const { title, id, poster_path, overview } = recs[i];
      if (!idCheck[id]) {
        idCheck.id = 1;
        recsArray.push({
          title,
          id,
          overview,
          poster_path: `https://image.tmdb.org/t/p/w500/${poster_path}`,
        })
      }
    }
  }
  res.locals.recsArray = recsArray;
  return next();
};



movieController.getFavs = async (req, res, next) => {
  const { username } = req.body;
  // get fav movie IDs from database
  // await User.findOne({ username }, (err, user) => {
  //   const dbFavs = user.favorites;
  // });

  // loop through favorite movies array, get movie info from database
  const favsList = ['1726', '272'];
  favsArray = [];
  for (let i = 0; i < favsList.length; i++){
    const res = await axios(`https://api.themoviedb.org/3/movie/${favsList[i]}?api_key=${process.env.TMBD}&language=en-US`)
    const { title, id, poster_path, overview } = res.data;
      favsArray.push({
        title,
        id,
        overview,
        poster_path: `https://image.tmdb.org/t/p/w500/${poster_path}`,
      });
  }
  res.locals.favsArray = favsArray;
  return next();
}

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
