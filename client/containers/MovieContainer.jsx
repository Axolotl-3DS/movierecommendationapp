import { lightblue } from "color-name";
import React, { useState, useEffect, useRef } from "react";
import MovieTile from '../components/MovieTile';
import axios from 'axios';


function MovieContainer (props) {
    const [items, setItems] = useState([]);
    const [sel, checkSel] = useState('temp');
    const [movies, refreshMovies] = useState({recommendations: []});
    const [search, setSearch] = useState('');

    const mounted = useRef();

    const handleTabs = () => {
      const selection = document.querySelector('input[name="type"]:checked').value;
      setCurrentTab(selection);
      console.log(currentTab);
    };
    const [currentTab, setCurrentTab] = useState('Explore');
    // Need to update or add additional useEffect conditons - make sure all tabs are populated with data so user can click in any order
    // right now breaks if user clicks before searching
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
      // console.log('movies prop', movies)
     
      async function onRegisterClick() {
        console.log('sending search query');
        /**
         * query logic here
         */
        let search_format = search.replace(" ", "+");
        axios.post('/api/search', {
          title: search_format
        })
        .then ( res => {
          // let wrapper = {searches: res.data.searchResults};
          let oldMovies = movies;
          oldMovies.searches = res.data.searchResults
          refreshMovies(oldMovies);
          build();
        })
        .catch (err => console.log('App.componentDidMount: ERROR: ', err));
      }

      const build = () => {

        if (sel !== currentTab) {
          const goods = [];
          console.log('movies',movies);
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
            case 'Searches':
              for (let i = 0; i < movies.searches.length; i++) {
                goods.push(<MovieTile className='movieBox' key={i} props={movies.searches[i]} />)
              };
              break;
            
          }
          setItems(goods);
          checkSel(currentTab);
        }
      };

    
    return (
        <div>
          <div>
            <input type='text' id='search' placeholder={'search'} onChange={e => setSearch(e.target.value)} className='textbox'></input>
            <button  className="buttons" id="searchButton" onClick={onRegisterClick}>Search for Recommendations</button>
          </div>
        <div className="tabs">
          <div className="radio-toolbar">

            <input type="radio" id="choice1"
            name="type" value="Favorites" onClick={handleTabs}/>
            <label htmlFor="choice1">Favs</label>

            <input type="radio" id="choice2"
            name="type" value="Recommendations" onClick={handleTabs}/>
            <label htmlFor="choice2">Recommendations</label>    

            <input type="radio" id="choice3"
            name="type" value="Searches" onClick={handleTabs}/>
            <label htmlFor="choice3">Searches</label>    

            </div>
          </div>    
          <div id='movieBox' className='tilescontainer'>
              {items}
          </div>
        </div>
    );
}

// className='' <- how you link up the style sheet class in react
// style={"color: blue; border: 1px; height: 100px; width: 50px"}
export default MovieContainer;