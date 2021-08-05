import React, { useState, useEffect, useRef } from "react";
import MovieTile from "../components/MovieTile";
import axios from "axios";

function MovieDisplayContainer(props) {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  // Persist the componentMounted and set to false
  const componentMounted = useRef(false);
  let movieCards = [];
  // right now breaks if user clicks before searching
  // useEffect(() => {});
  async function onClickSearch() {
    if (event.key === "Enter") {
      let search_format = search.replace(" ", "+");
      axios
        .post("/api/search", { title: search_format })
        .then((res) => {
          console.log(res);
          let wrapper = { searches: res.data.searchResults };
          setItems(res.data.searchResults);
        })
        .catch((err) => console.log("App.componentDidMount: ERROR: ", err));
    }
  }

  const renderResults = () => {
    let runOnce = false;
    if (items.length > 0 && runOnce === false) {
      // Renders movieTile with contents of the movies prop
      runOnce = true;
      return items.map((el, i) => {
        return <MovieTile className='movieTile' key={i} props={el} />;
      });
    }
  };

  const onChange = (e) => setSearch(e.target.value);

  return (
    <div>
      <div className='searchBar'>
        <span>
          <h3>MovieSnek</h3>
        </span>
        <input
          type='text'
          id='search'
          placeholder={"search"}
          onChange={onChange}
          className='textbox'
          onKeyDown={onClickSearch}></input>
      </div>
      <div className='movieDisplayContainer'>{renderResults()}</div>
    </div>
  );
}

export default MovieDisplayContainer;
