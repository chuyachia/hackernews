import item from '../../__mocks__/itemwkids.json';
import { shallow } from 'enzyme';
import React from 'react';
import News from '../../src/shared/components/News';
import * as enzyme from 'enzyme';
import ReactSixteenAdapter  from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import toJson from 'enzyme-to-json';

enzyme.configure({ adapter: new ReactSixteenAdapter() });


describe('News test',()=>{
    let wrapper;
    beforeEach(()=>{wrapper = shallow(<News key={0} data={item}/>);})
    it('News snapshot test', async () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('News click test', async () => {
      expect(wrapper.state().showcomments).toEqual(false);
      wrapper.find('#showhide').simulate('click');
      expect(wrapper.state().showcomments).toEqual(true);
    });
})