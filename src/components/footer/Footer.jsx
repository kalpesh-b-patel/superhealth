import React from 'react';
import {
	Container,
	Row,
	Col
} from 'reactstrap';

const Footer = () => {
	const style = {
		footer: {
			backgroundColor: '#1C2232',
			padding: '26px',
			color: '#FFF',
			textAlign: 'center',
			boxShadow: '0 0 10px 1px #1C2232'
		}
	};
	return (
		<Container fluid style = { style.footer } >
			<Row>
				<Col>
					<p>Copyright &copy; 2018 Super Health Inc</p>
				</Col>
			</Row>
		</Container>
	);
};

export default Footer;
