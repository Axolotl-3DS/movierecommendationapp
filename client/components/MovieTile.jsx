import React, { useState } from "react";

function MovieTile(props) {
  // lift state up - pass in as props?
  // console.log(props.props.title);
  const { id, title, overview, poster_path } = props.props;
  const [star, setStar] = useState(false);
  const [movieTitle, setMovieTitle] = useState(title);
  const [description, setDescription] = useState("Loading");
  const [poster, usePoster] = useState(poster_path);
  const [check, setCheck] = useState(false);

  function handleOnClick() {
    setCheck({
      condition: !check,
    });
  }

  return (
    <div className='movieTile'>
      {/* <div
        id={check ? "heart:is-active" : "heart"}
        onClick={handleOnClick}></div> */}
      <img className='moviePosterImg' src={poster_path} />
      <p className='movieTitle'>{title}</p>
    </div>
  );
}

export default MovieTile;
