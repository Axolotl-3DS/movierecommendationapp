import React, { useState, useEffect } from "react";
import MovieTile from "../components/MovieTile";
import { useSelector } from 'react-redux'
import axios from "axios";

function RecsDisplayContainer() {

  const [recsList, setRecsList] = useState([]);
  // grab the username from the store
  // then post request to server to grab favs from database
  const username = useSelector(state => state.user.currentUser);
  useEffect(() => {
    try {
    axios
    .post("/api/recs", {username: username})
    .then((res) => {
      setRecsList(res.data);
    })
    .catch((err) => console.log("ERROR: ", err));
  } catch(err) {
    console.log(err);
  }
  });

  // then I want to display all the favorites;

  const renderResults = () => {
    let runOnce = false;
    if (recsList.length > 0 && runOnce === false) {
      // Renders movieTile with contents of the movies prop
      runOnce = true;
      return recsList.map((el, i) => {
        return <MovieTile className='movieTile' key={i} props={el} />;
      });
    }
  };


  return (
    <div>
      <div className='movieDisplayContainer'>{renderResults()}</div>
    </div>
  );
}

export default RecsDisplayContainer;
