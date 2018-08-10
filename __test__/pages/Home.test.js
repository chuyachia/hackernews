import { shallow } from 'enzyme';
import React from 'react';
import Home from '../../src/shared/pages/Home';
import * as enzyme from 'enzyme';
import ReactSixteenAdapter  from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import toJson from 'enzyme-to-json';

enzyme.configure({ adapter: new ReactSixteenAdapter() });


const flushPromises = () => new Promise(resolve => setImmediate(resolve));

it('Home snapshot test', async () => {
  const wrapper = shallow(<Home />);
  await flushPromises();
  wrapper.update();
  expect(toJson(wrapper)).toMatchSnapshot();
});
