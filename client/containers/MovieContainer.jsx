import React, { useState, useEffect, useRef } from "react";
import MovieTile from "../components/MovieTile";
import axios from "axios";

function MovieContainer() {
  const [items, setItems] = useState([]);
  const [sel, checkSel] = useState("temp");
  const [movies, refreshMovies] = useState({ recommendations: [] });
  const [search, setSearch] = useState({ title: "" });

  // Persist the componentMounted and set to false
  const componentMounted = useRef(false);

  // right now breaks if user clicks before searching
  useEffect(() => {
    // Check if the component has been mounted if not fetch data from api endpoint
    if (!componentMounted.current) {
      axios("/api/")
        // Return refreshed movie data
        .then((res) => {
          refreshMovies(res.data);
        })
        .catch((err) => console.log("App.componentDidMount: ERROR: ", err));
      componentMounted.current = true;
      //
    } else {
      build();
    }
  });

  // TODO: Rename on register click and build our query promise
  async function onClickSearch() {
    /**
     * query logic here
     */
    if (!search) return console.log("search not defined");
    try {
      console.log(search);
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
  // TODO: What does build do? How is it different to render?
  const build = () => {
    // TODO: Pick apart this function
    if (sel !== currentTab) {
      const goods = [];
      for (let i = 0; i < movies.searches.length; i++) {
        goods.push(
          <MovieTile className='movieBox' key={i} props={movies.searches[i]} />
        );
      }
    }
    // TODO: Check what these hooks do and comment
    setItems(goods);
    checkSel(currentTab);
  };

  return (
    <div>
      <div>
        <input
          type='text'
          id='search'
          placeholder={"search"}
          onChange={(e) => {
            console.log(e.target.value);
            const newSearchObj = { title: e.target.value };
            setSearch(newSearchObj);
          }}
          className='textbox'></input>
        <button className='buttons' id='searchButton' onClick={onClickSearch}>
          Search
        </button>
      </div>
      <div id='movieBox' className='tilescontainer'>
        {items}
      </div>
    </div>
  );
}

export default MovieContainer;
