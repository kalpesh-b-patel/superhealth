import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	Container,
	Navbar,
	NavbarBrand,
	NavbarToggler,
	Collapse,
	Nav,
	NavItem,
	NavLink
} from 'reactstrap';
import './Header.css';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		};
	}

	handleToggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		const style = {
			brand: {
				width: '50px',
				fontFamily: 'Roboto, sans-serif',
			},
			navbar: {
				backgroundColor: '#1C2232',
				boxShadow: '0 0 10px 1px #1C2232'
			}
		}
		return (
			<Navbar dark expand="sm" style = { style.navbar } >
				<Container>
				<NavbarBrand tag={Link} to="/">
					Super&nbsp;<img src="/images/health.png" style = { style.brand } alt = "Super Health Logo" />&nbsp;Health
				</NavbarBrand>
				<NavbarToggler onClick={this.handleToggle} />
				<Collapse isOpen = { this.state.isOpen } navbar >
					<Nav className="ml-auto" navbar>
						{ this.props.isAuthenticated &&
							<NavItem>
								<NavLink>
									<i className="fas fa-user-circle"></i> { localStorage.getItem('email') }
								</NavLink>
							</NavItem>
						}
						{ this.props.isAuthenticated &&
							<NavItem>
								<NavLink tag={Link} to="/logout">
									<i className="fas fa-sign-out-alt"></i>&nbsp;Logout
								</NavLink>
							</NavItem>
						}
					</Nav>
				</Collapse>
				</Container>
			</Navbar>
		);
	}
}

export default connect(state => {
	return {
		authStatus: state.authentication
	};
})(Header);

Header.propTypes = {
	light: PropTypes.bool,
	color: PropTypes.string,
	expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  }