import React, { useState } from "react";

function MovieTile(props) {
  console.log(props);
  // lift state up - pass in as props?
  const { id, title, poster_path } = props.props;
  const [isFav, setFav] = useState(true);

  function ToggleFav(id) {
    if (!isFav) {
      props.setFavs(
        props.favs.filter((film) => {
          film !== id;
        })
      );
    } else {
      props.setFavs([...props.favs, id]);
    }
    console.log(props.favs);
    setFav(!isFav);
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
