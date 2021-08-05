import React, { useState, useEffect, useRef } from "react";
import MovieTile from "../components/MovieTile";
import axios from "axios";

function MovieContainer(props) {
  const [items, setItems] = useState([]);
  //const [movies, refreshMovies] = useState({ recommendations: [] });
  const [search, setSearch] = useState("");

  // Persist the componentMounted and set to false
  const componentMounted = useRef(false);

  // right now breaks if user clicks before searching
  // useEffect(() => {
  //   // Check if the component has been mounted if not fetch data from api endpoint
  //   // if (!componentMounted.current) {
  //   //   axios("/api/")
  //   //     // Return refreshed movie data
  //   //     .then((res) => {
  //   //       console.log(res.data);
  //   //       //refreshMovies(res.data);
  //   //     })
  //   //     .catch((err) => console.log("App.componentDidMount: ERROR: ", err));
  //   //   componentMounted.current = true;
  //   //   //
  //   // } else {
  //   // fillMovieContainer();
  //   // }
  // });
  async function onClickSearch() {
    /**
     * query logic here
     */
    // Send alert to browser if no input is provided
    if (!search || search === "") return alert("search not defined");
    try {
      await console.log(search);
      // let search_format = search.replace(" ", "+");
      // axios
      //   .post("/api/search", {
      //     title: search_format,
      //   })
      //   .then((res) => {
      //     // let wrapper = {searches: res.data.searchResults};
      //     let oldMovies = movies;
      //     oldMovies.searches = res.data.searchResults;
      //     refreshMovies(oldMovies);
      //     build();
      //   })
      //   .catch((err) => console.log("App.componentDidMount: ERROR: ", err));
    } catch (err) {
      console.log(err);
    }
  }

  const onChange = (e) => {
    console.log(e.target.value);
    const newSearchObj = e.target.value;
    console.log("setting new search object", newSearchObj);
    setSearch(e.target.value);
    console.log("search set: ", search);
  };

  // Declare movies to render
  const moviesToRender = [];

  // Renders movieTile with contents of the movies prop
  const fillMovieContainer = () => {
    for (let i = 0; i < items.length; i++) {
      movies.push(<MovieTile className='movieBox' key={i} props={items[i]} />);
    }
    // Replaces the items in state
    setItems(moviesToRender);
  };

  return (
    <div>
      <div>
        <input
          type='text'
          id='search'
          placeholder={"search"}
          onChange={onChange}
          className='textbox'></input>
        <button className='buttons' id='searchButton' onClick={onClickSearch}>
          Search
        </button>
      </div>
      <div id='movieBox' className='tilescontainer'>
        {moviesToRender}
      </div>
    </div>
  );
}

export default MovieContainer;
