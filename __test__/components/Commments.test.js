import item from '../../__mocks__/itemwkids.json';
import { shallow } from 'enzyme';
import React from 'react';
import Comments from '../../src/shared/components/Comments';
import * as enzyme from 'enzyme';
import ReactSixteenAdapter  from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

enzyme.configure({ adapter: new ReactSixteenAdapter() });


describe('Comments component test',()=>{
    let wrapper;
    beforeEach(()=>{wrapper = shallow(<Comments key={0} data={item}/>);})
    it('Comments component snapshot', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('Comments component has the same number of comments child as the number of kids in data', () => {
      expect(wrapper.find(Comments)).toHaveLength(item.kids.length);
    });
})