import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MovieTile from "../components/MovieTile";
import axios from "axios";

function MovieDisplayContainer(props) {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [favs, setFavs] = useState([]);
  const [componentMounted, setMount] = useState(false);

  // right now breaks if user clicks before searching
  useEffect(() => {
    console.log(favs);
  });
  async function onClickSearch() {
    if (event.key === "Enter") {
      let search_format = search.replace(" ", "+");
      axios
        .post("/api/search", { title: search_format })
        .then((res) => {
          setItems(res.data.searchResults);
        })
        .catch((err) => console.log("App.componentDidMount: ERROR: ", err));
    }
  }

  function getFavs(favs) {
    axios
      .get("api/favs")
      .then((res) => {})
      .catch((err) => {
        console.log("Error retrieving favs", err);
      });
  }

  const username = useSelector((state) => state.user.currentUser);
  async function newfavs() {
    const favs = ["123124, 124124"];
    try {
      const res = await axios.post("api/postFavs", {
        username: username,
        favs: favs,
      });
      console.log(res);
    } catch (err) {
      console.log("Error retrieving favs", err);
    }
  }

  const renderResults = () => {
    let runOnce = false;
    if (items.length > 0 && runOnce === false) {
      // Renders movieTile with contents of the movies prop
      runOnce = true;
      const currentMovieSearchList = items.map((el, i) => {
        return (
          <MovieTile
            className='movieTile'
            setFavs={setFavs}
            favs={favs}
            key={i}
            props={el}
          />
        );
      });
      return currentMovieSearchList;
    }
  };

  const onChange = (e) => setSearch(e.target.value);

  const logOut = async () => {
    const res = await fetch("login/logout", { method: "DELETE" });
    window.location.href = "/";
  };

  return (
    <div className='contentContainer'>
      <div className='header'>
        <div className='searchBar'>
          <span>
            <h3>MovieSnek</h3>
          </span>
          <input
            type='text'
            id='search'
            placeholder={"search"}
            onChange={onChange}
            className='textboxHome'
            onKeyDown={onClickSearch}></input>
        </div>
        <button className='logOutBtn' onClick={logOut}>
          Log Out
        </button>
      </div>
      <div className='movieDisplayContainer'>{renderResults()}</div>
    </div>
  );
}

export default MovieDisplayContainer;
