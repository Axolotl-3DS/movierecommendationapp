import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import Login from '../client/components/Login.jsx';
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


