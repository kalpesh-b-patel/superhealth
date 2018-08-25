import React, { Component } from 'react';
import * as LoginActions from '../../containers/login/LoginActions';
import { connect } from 'react-redux';
import {
	Container,
	Row,
	Col
} from 'reactstrap';

class Logout extends Component {
	componentDidMount() {
		localStorage.removeItem('token');
		localStorage.removeItem('isAuthenticated');
		localStorage.removeItem('type');
		localStorage.removeItem('email');
		localStorage.removeItem('isAdmin');
		this.props.dispatch(LoginActions.logoutUser());
		setTimeout(() => {
			this.props.history.push('/');
		}, 2000);
	}
	render() {
		const style = {
			container: {
				minHeight: 'calc(100vh - 152px)'
			},
			img: {
				display: 'block',
				margin: '0 auto',
				marginTop: '20px'
			}
		};
		return(
			<Container style = { style.container } >
				<Row>
					<Col>
						<img src="/images/Loading_icon.gif" alt="loading..." style = { style.img } />
					</Col>
				</Row>
			</Container>
		);
	}
}

// export default Logout;
export default connect(state => {
	return {
		authentication: state.authentication
	};
})(Logout);
