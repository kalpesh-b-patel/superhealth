import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as LoginActions from './LoginActions';
import { 
	Container,
	Row,
	Col,
	Card,
	CardBody,
	CardTitle,
	Form,
	FormGroup,
	Input,
	Alert,
	Button
} from 'reactstrap';
import './Login.css';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			isAuthenticated: false,
			validationErrors: ''
		};
	}

	handleInput = event => {
		const { name, value } = event.target;
        this.setState({
            [name]: value,
			validationErrors: ''
		});
		if(this.props.authStatus.alert) {
			this.props.dispatch(LoginActions.resetAlert());
		}
	}

	handleLogin = () => {
		const isValid = this.validateUserInput();
		if(isValid) {
			const user = {
				username: this.state.email,
				password: this.state.password
			};
			this.props.dispatch(LoginActions.authenticateUser(user));
		}
	}

	validateUserInput = () => {
		let errors = {};
		if(this.state.email !== '' && this.state.password !== '') {
			let isEmailValid = false;
			let isPasswordValid = false;
			
			// validate email
			if(this.state.email !== '') {
				let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if(!re.test(String(this.state.email).toLowerCase())) {
					errors.email = {
						state: 'invalid',
						message: 'Invalid Email'
					};
				}
				else
					isEmailValid = true;
			}

			// validate password
			if(this.state.password !== '') {
				if(this.state.password.length < 5) {
					errors.password = {
						state: 'invalid',
						message: 'Length must be greater than 4'
					};
				}
				else
					isPasswordValid = true;
			}
			if(isEmailValid && isPasswordValid)
				return true;
			else {
				this.setState({
					validationErrors: errors
				});
				return false;
			}
		}
		else {
			if(this.state.email === '') {
				errors.email = {
					state: 'invalid',
					message: 'Email is required'
				};
			}
			if(this.state.password === '') {
				errors.password = {
					state: 'invalid',
					message: 'Password is required'
				};
			}
			this.setState({
				validationErrors: errors
			});
			return false;
		}
	}

	validateEmail = email => {
		var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	reset() {
		this.setState({
			email: '',
			password: '',
			validationErrors: ''
		});
	}

	componentWillUnmount() {
		this.reset();
		this.props.dispatch(LoginActions.resetAlert());
	}

	render() {
		const style = {
			input: {
				border: '0',
				borderRadius: '0',
				boxShadow: 'none',
				borderBottom: '1px solid #000',
				color: '#1C2232'
			},
			card: {
				border: '1px solid #FFF',
				borderRadius: 0,
				boxShadow: '0 0 10px 2px #ccc',
				marginTop: '20px',
				marginBottom: '20px',
			},
			alert: {
				borderRadius: '0'
			},
			button: {
				borderRadius: '0'
			},
			brand: {
				display: 'block',
				margin: '0 auto',
				width: '50px'
			},
			error: {
				color: '#D9534F',
				fontSize: '13px'
			}
		};
		return (
			<Fragment>
				{ localStorage.getItem('isAuthenticated') &&
					<Redirect to = "/patient" />
				}
				<Container>
					<Row>
						<Col xl = {{ size: '6', offset: '3'}} lg = {{ size: '6', offset: '3'}} md = {{ size: '6', offset: '3'}} sm='12' xs='12'>
							<Card style = { style.card } >
								<CardBody>
									<CardTitle>
										<img src="/images/health.png" style = { style.brand } alt = "Super Health Logo" />
									</CardTitle>
									<Form>
										{/* Email */}
										<FormGroup>
											<Input 
												type = "email"
												name = "email" 
												value = { this.state.email }
												onChange = { this.handleInput }
												style = { style.input }
												placeholder = "Email" 
												/>
												{ this.state.validationErrors.email &&
													<span style = { style.error } >
														{ this.state.validationErrors.email.message }
													</span>
												}
										</FormGroup>
										{/* Password */}
										<FormGroup>
											<Input
												type = "password"
												name = "password"
												value = { this.state.password }
												onChange = { this.handleInput }
												style = { style.input }
												placeholder = "Password" 
												/>
												{ this.state.validationErrors.password &&
													<span style = { style.error } >
														{ this.state.validationErrors.password.message }
													</span>
												}
										</FormGroup>
									</Form>
									{ this.props.authStatus.alert && 
										<Alert color = { this.props.authStatus.alert.color } >
											{ this.props.authStatus.alert.message }
										</Alert>
									}
									<Button 
										onClick = { this.handleLogin }
										className="float-right btn-login">
										<i className="fas fa-sign-in-alt"></i>&nbsp;Login
									</Button>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</Fragment>
		);
	}
}

export default connect(state => {
	return {
		authStatus: state.authentication
	};
})(Login);
