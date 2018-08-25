import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import Footer from '../../components/footer/Footer';
import {
	Container,
	Row,
	Col
} from 'reactstrap';

configure({
	adapter: new Adapter()
});

describe('<Footer />', () => {
	let wrapper = '';
	beforeEach(() => {
		wrapper = shallow(<Footer />);
	});

	it('should have Container component inside it', () => {
		expect(wrapper.find(Container)).toHaveLength(1);
	});

	it('should have Row component inside it', () => {
		expect(wrapper.find(Row)).toHaveLength(1);
	});

	it('should have Col component inside it', () => {
		expect(wrapper.find(Col)).toHaveLength(1);
	});

	it('should have text', () => {
		expect(wrapper.find(Col).find('p').text()).toBe('Copyright © 2018 Super Health Inc');
	});

});