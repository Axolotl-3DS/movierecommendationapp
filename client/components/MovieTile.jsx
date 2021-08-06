import React, { useState } from "react";

function MovieTile(props) {
  console.log(props);
  // lift state up - pass in as props?
  const { id, title, poster_path } = props.props;
  const [isChecked, setChecked] = useState(true);

  function ToggleFav(id) {
    if (!isChecked) {
      props.setFavs(
        props.favs.filter((film) => {
          film !== id;
        })
      );
    } else {
      props.setFavs([...props.favs, id]);
    }
    console.log(props.favs);
    setChecked(!isChecked);
  }

  return (
    <div className='movieTile'>
      <input
        className='likeButton'
        type='checkbox'
        onClick={() => ToggleFav(id)}></input>
      <img className='moviePosterImg' src={poster_path} />
      <p className='movieTitle'>{title}</p>
    </div>
  );
}

export default MovieTile;
