import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import Login from '../client/components/Login.jsx';
import Home from '../client/containers/Home.jsx';
import MovieTile from '../client/components/MovieTile.jsx';
import MovieContainer from '../client/containers/MovieContainer.jsx';

// Newer Enzyme versions require an adapter to a particular version of React
configure({ adapter: new Adapter() });

describe('React unit tests', () => {

  // Login area includes multiple buttons & text areas for signin/login
  describe('Login', () => {
    let wrapper;
    // const props = {

    // }

    beforeAll(() => {
      wrapper = shallow(<Login />);
    });

    // Login Page shows the correct buttons & text areas
    it('Renders the title', () => {
      expect(wrapper.find('h1').text()).toEqual('Recommend Me!');
    });
  });

  //Test Home/Search pages
  describe('Home / Search Page', () => {
    let wrapper;
    // const props = {

    // }

    beforeAll(() => {
      wrapper = shallow(<Home />);
    });

    // Home page has a movieContainer component
    it('Renders the Movie Container page', () => {
      expect(wrapper.find('MovieContainer')).toHaveLength(1);
    });

    //Search page has a isLoggedIn state
    it('Renders the Movie Container page', () => {
      expect(wrapper.find('MovieContainer').state('isLoggedIn')).toBe(true);
    });

    //Search page has a Searchbox
    it('Renders the Movie Container page', () => {
      expect(wrapper.find('MovieContainer').state('isLoggedIn')).toBe(true);
    });
  });




