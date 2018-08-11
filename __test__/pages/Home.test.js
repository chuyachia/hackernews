import { shallow } from 'enzyme';
import React from 'react';
import Home from '../../src/shared/pages/Home';
import News from '../../src/shared/components/News';
import * as enzyme from 'enzyme';
import ReactSixteenAdapter  from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

enzyme.configure({ adapter: new ReactSixteenAdapter() });


const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe('Home page test',()=>{
      let wrapper;
      beforeEach(async ()=>{
        wrapper = shallow(<Home />);
        await flushPromises();
        wrapper.update();
      })
      it('Home page snapshot',() => {
        expect(toJson(wrapper)).toMatchSnapshot();
      });
      it('Home page has 10 news components',() => {
        expect(wrapper.find(News)).toHaveLength(10);
      });
})
