import React, { Fragment } from 'react';
import {
	Jumbotron
} from 'reactstrap';

import Login from '../../containers/login/Login';

const Home = props => {
	const style = {
		jumbotron: {
			minHeight: 'calc(100vh - 152px)',
			margin: '0',
			padding: '0',
			borderRadius: '0',
			backgroundColor: '#FFF'
		}
	};
	return (
		<Fragment>
			<Jumbotron fluid style = { style.jumbotron }>
				<Login />
			</Jumbotron>
		</Fragment>
	);
};

export default Home;
