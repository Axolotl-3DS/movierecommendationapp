import React, { useState, useEffect } from "react";
import UserTabs from '../components/UserTabs';
import MovieContainer from './MovieContainer';

const Home = (props) => {
    // we need states to keep track of which tab we're on - Favorites, Recommendations, or Random
    const [currentTab, setCurrentTab] = useState('Explore');
    
    // will need to talk to backend to get us new movies
    const[currentMovies, refreshMovies] = useState({
        explore: [],
        favorites: [],
        recommendations: [],
        random: []
    });



    // these will the final rendered components
    // const [rendered, updatedRendered] = useState([]);
    
    // if star is clicked
    // push movies into updatedRendered array 
    
    // TODO - call on update? (useEffect) - needs to keep backend updated on what has been selected etc.
    // That way backend can know to update recommendations 


    // TODO - add adbox here on Home Page
    return (
    <div id="Home">
      <MovieContainer/>
    </div>
    );
};

export default Home;
