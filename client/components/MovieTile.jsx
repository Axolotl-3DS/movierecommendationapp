import React, { useState } from "react";

function MovieTile(props) {
  // lift state up - pass in as props?
  // console.log(props.props.title);
  const { id, title, overview, poster_path } = props.props;
  const [star, setStar] = useState(false);
  const [movieTitle, setMovieTitle] = useState(title);
  const [description, setDescription] = useState("Loading");
  const [poster, usePoster] = useState(poster_path);

  return (
    <div id='movieTile'>
      <div id='poster'>
        <div id='star'>
          <img className='moviePosterImg' src={poster_path} />
          <p id='description'>{title}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieTile;
