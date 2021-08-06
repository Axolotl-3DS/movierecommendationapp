const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.get(
  "/api/favs",
  (req, res, next) => {
    console.log("hits get route");
  },
  // movieController.getUserInput,
  // movieController.getFavs,
  (req, res) => res.status(200).json(res.locals)
);

router.post("/search", movieController.getSearch, (req, res) =>
  res.status(200).json(res.locals)
);

router.post("/favs", movieController.getFavs, (req, res) =>
  res.status(200).json(res.locals.favsArray)
);

router.post("/update", movieController.update, (req, res) =>
  res.status(200).send("Successfully added to db")
);

router.post("/recs", movieController.getRecs, (req, res) =>
  res.status(200).json(res.locals.recsArray)
);

module.exports = router;
