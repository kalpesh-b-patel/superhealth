import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import App from '../../containers/app/App';
import Header from '../../containers/header/Header';

window.localStorage = {
	getItem: 'isAuthenticated'
};

configure({
	adapter: new Adapter()
});

describe('<App />', () => {
	let wrapper = '';
	beforeEach(() => {
		wrapper = shallow(<App />);
	});

	it('should have Header component inside it', () => {
		expect(wrapper.find(Header)).toHaveLength(1);
	});

});