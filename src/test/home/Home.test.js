import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import Home from '../../components/home/Home';
import Login from '../../containers/login/Login';
import { Jumbotron } from 'reactstrap';

configure({
	adapter: new Adapter()
});

describe('<Home />', () => {
	let wrapper = '';
	beforeEach(() => {
		wrapper = shallow(<Home />);
	});

	it('should have Jumbotron component inside it', () => {
		expect(wrapper.find(Jumbotron)).toHaveLength(1);
	});

	it('should have login component inside it', () => {
		expect(wrapper.find(Login)).toHaveLength(1);
	});

});