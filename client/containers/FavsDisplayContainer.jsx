import React, { useState, useEffect } from "react";
import MovieTile from "../components/MovieTile";
import { useSelector } from 'react-redux'
import axios from "axios";

function FavsDisplayContainer() {

  const [favsList, setFavsList] = useState([]);
  // grab the username from the store
  // then post request to server to grab favs from database
  const username = useSelector(state => state.user.currentUser);
  useEffect(() => {
    try {
    axios
    .post("/api/favs", {username: username})
    .then((res) => {
      setFavsList(res.data);
    })
    .catch((err) => console.log("ERROR: ", err));
  } catch(err) {
    console.log(err);
  }
  });

  // then I want to display all the favorites;

  const renderResults = () => {
    let runOnce = false;
    if (favsList.length > 0 && runOnce === false) {
      // Renders movieTile with contents of the movies prop
      runOnce = true;
      return favsList.map((el, i) => {
        return <MovieTile className='movieTile' key={i} props={el} />;
      });
    }
  };


  return (
    <div>
      <h2>Your Favorite Movies!</h2>
      <div className='movieDisplayContainer'>{renderResults()}</div>
    </div>
  );
}

export default FavsDisplayContainer;
