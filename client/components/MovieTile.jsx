import { lightblue } from "color-name";
import React, { useState, useEffect } from "react";
import axios from 'axios';


function MovieTile (props) {
    // lift state up - pass in as props?
    // console.log(props.props.title);
    const { id, title, overview, poster_path } = props.props;
    const [star, setStar] = useState(false);
    const [movieTitle, setMovieTitle] = useState(title);
    const [description, setDescription] = useState('Loading');
    const [poster, usePoster] = useState(poster_path);


    const borderStyle = {
        border: '1px',
        height: '400px',
        width: '350px',
        // backgroundColor: 'DodgerBlue',
        borderColor: 'black',
        color: 'white',
    };
    const imgStyle = {
        border: '1px',
        backgroundImage: "url("+ poster_path + ")",
        height: '100%',
        width: '100%',
        backgroundSize: 'cover',
    };

    // const mystyle = {
    //     color: "white",
    //     backgroundColor: "DodgerBlue",
    //     padding: "10px",
    //     fontFamily: "Arial"
    //   };

    return (
        <div id='movieTile' style={borderStyle}>
            <div id='poster' style={imgStyle}>
                <div id='star'>
                    {/* <img className='moviePosterImg' src={poster_path} /> */}
                    <p id='description'>
                        {title}
                    </p>
                </div>
            </div>
        </div>
    );
}

// className='' <- how you link up the style sheet class in react
// style={"color: blue; border: 1px; height: 100px; width: 50px"}
export default MovieTile;
