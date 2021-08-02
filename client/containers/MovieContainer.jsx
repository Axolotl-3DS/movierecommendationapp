import { lightblue } from "color-name";
import React, { useState, useEffect, useRef } from "react";
import MovieTile from '../components/MovieTile';
import axios from 'axios';


function MovieContainer (props) {
    const { currentTab } = props 
    const [items, setItems] = useState([]);
    const [sel, checkSel] = useState('temp');
    const [movies, refreshMovies] = useState({recommendations: []});

    const mounted = useRef();

    useEffect(() => {
        if (!mounted.current) {
            axios('/api/')
            .then(res => {
              refreshMovies(res.data)
            })
            .catch(err => console.log('App.componentDidMount: ERROR: ', err));
          mounted.current = true;
        } else {
          build();
        }
      });
      console.log('movies prop', movies)
     
      const build = () => {
        if (sel !== currentTab) {
          const goods = [];
          switch(currentTab) {
            case 'Recommendations':
              for (let i = 0; i < movies.recommendations.length; i++) {
                goods.push(<MovieTile className='movieBox' key={i} props={movies.recommendations[i]} />)
              };
              break;
            case 'Favorites':
              for (let i = 0; i < 5; i++) {
                goods.push(<MovieTile className='movieBox' key={i} props={movies.favs[i]} />)
              };
              break;
          }
          setItems(goods);
          checkSel(currentTab);
        }
      };

    
    return (        
        <div id='movieBox' className='tilescontainer'>
            {items}
        </div>
    );
}

// className='' <- how you link up the style sheet class in react
// style={"color: blue; border: 1px; height: 100px; width: 50px"}
export default MovieContainer;