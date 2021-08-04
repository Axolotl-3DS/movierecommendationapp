import React, { useState, useEffect, useRef } from "react";
import MovieTile from "../components/MovieTile";
import axios from "axios";

function MovieContainer() {
  const [items, setItems] = useState([]);
  const [sel, checkSel] = useState("temp");
  const [movies, refreshMovies] = useState({ recommendations: [] });
  const [search, setSearch] = useState({ title: "" });
  const [currentTab, setCurrentTab] = useState("Explore");

  // TODO: Look into what useRef does as a hook
  const mounted = useRef();

  const handleTabs = () => {
    const selection = document.querySelector(
      'input[name="type"]:checked'
    ).value;
    setCurrentTab(selection);
    console.log(currentTab);
  };
  // right now breaks if user clicks before searching
  useEffect(() => {
    if (!mounted.current) {
      axios("/api/")
        .then((res) => {
          refreshMovies(res.data);
        })
        .catch((err) => console.log("App.componentDidMount: ERROR: ", err));
      mounted.current = true;
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
      switch (currentTab) {
        case "Recommendations":
          for (let i = 0; i < movies.recommendations.length; i++) {
            goods.push(
              <MovieTile
                className='movieBox'
                key={i}
                props={movies.recommendations[i]}
              />
            );
          }
          break;
        case "Favorites":
          for (let i = 0; i < 5; i++) {
            goods.push(
              <MovieTile className='movieBox' key={i} props={movies.favs[i]} />
            );
          }
          break;
        case "Searches":
          for (let i = 0; i < movies.searches.length; i++) {
            goods.push(
              <MovieTile
                className='movieBox'
                key={i}
                props={movies.searches[i]}
              />
            );
          }
          break;
      }
      // TODO: Check what these hooks do and comment
      setItems(goods);
      checkSel(currentTab);
    }
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
