import item from '../../__mocks__/itemwkids.json';
import { shallow } from 'enzyme';
import React from 'react';
import News from '../../src/shared/components/News';
import * as enzyme from 'enzyme';
import ReactSixteenAdapter  from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

enzyme.configure({ adapter: new ReactSixteenAdapter() });


describe('News component test',()=>{
    let wrapper;
    beforeEach(()=>{wrapper = shallow(<News key={0} data={item}/>);})
    it('News component snapshot', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('News component reacts to click', () => {
      expect(wrapper.state().showcomments).toEqual(false);
      wrapper.find('.fa-sort-down').simulate('click');
      expect(wrapper.state().showcomments).toEqual(true);
    });
})