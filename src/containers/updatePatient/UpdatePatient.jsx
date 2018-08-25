import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as PatientActions from './PatientActions';
import {
	Container,
	Row,
	Col,
	Card,
	CardTitle,
	CardBody,
	Form,
	FormGroup,
	Input,
	FormFeedback,
	Alert,
	Button
} from 'reactstrap';
import states from '../../misc/states';
import cities from '../../misc/cities';

class UpdatePatient extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// input fields
			firstname: '',
			lastname: '',
			gender: '',
			ssn: '',
			age: '',
			height: '',
			weight: '',
			street: '',
			city: '',
			postal: '',
			state: '',
			insurance: '',
			validationErrors: '',
		};
	}

	handleInput = event => {
		const { name, value } = event.target;
        this.setState({
            [name]: value,
			validationErrors: ''
        });
	}

	onSubmit = event => {
		event.preventDefault();
		// const isValid = this.validate();
		if(true) {
			const patient = {
				_id: this.props.patients._id,
				firstname: this.state.firstname ? this.state.firstname: this.props.patients.firstname,
				lastname: this.state.lastname ? this.state.lastname: this.props.patients.lastname,
				ssn: this.state.ssn ? this.state.ssn : this.props.patients.ssn,
				address: {
					street: this.state.street ? this.state.street : this.props.patients.address.street,
					city: this.state.city ? this.state.city : this.props.patients.address.city,
					state: this.state.state ? this.state.state : this.props.patients.address.state,
					postal: this.state.postal? this.state.postal : this.props.patients.address.postal,
				},
				age: this.state.age ? this.state.age: this.props.patients.age,
				gender: this.state.gender ? this.state.gender: this.props.patients.gender,
				height: this.state.height ? this.state.height: this.props.patients.height,
				weight: this.state.weight ? this.state.weight: this.props.patients.weight,
				insurance: this.state.insurance ? this.state.insurance: this.props.patients.insurance,
			}
			this.props.dispatch(PatientActions.updatePatient(patient));
			console.log(patient);
		}
	}

	componentDidMount() {
		const id = this.props.match.params.patient_id;
		// this.props.dispatch(PatientActions.
		this.props.dispatch(PatientActions.getPatientById(id));
	}

	render() {
		const style = {
			container: {
				minHeight: 'calc(100vh - 152px)'
			},
			nav: {
				marginTop: '20px'
			},
			view: {
				marginTop: '20px'
			},
			add: {
				marginTop: '20px'
			},
			thead: {
				backgroundColor: '#1C2232',
				color: '#FFF'
			},
			card: {
				// border: '1px solid #1C2232',
				borderRadius: 0,
				boxShadow: '0 0 10px 2px #1C2232',
				marginTop: '20px',
				marginBottom: '20px',
				// backgroundColor: '#1C2232'
			},
			title: {
				color: '#1C2232',
				marginTop: '10px',
				marginLeft: '10px'
			},
			input: {
				// border: '0',
				borderRadius: '0',
				boxShadow: 'none',
				border: '1px solid #000',
				color: '#1C2232'
			},
			formCol: {
				paddingRight: '5px',
				paddingLeft: '5px'
			},
			right: {
				textAlign: 'right'
			},
			left: {
				textAlign: 'left'
			},
			modalHeader: {
				backgroundColor: '#1C2232',
				color: '#FFF'
			},
			modalBody: {
				color: '#D9534F'
			},
			loading: {
				display: 'block',
				margin: '0 auto',
				width: '70px'
			}
		};
		return (
			<Container style = { style.container }>
				{
					!localStorage.getItem('isAuthenticated') &&
						<Redirect to = "/" />
				}
				{
					localStorage.getItem('isAdmin') === 'false' &&
					<Redirect to = "/" />
				}
				{ this.props.patients &&
				<Row>
					<Col xl={12} lg={12} md={12} sm={12} xs={12} id="add-patient" style = { style.add } >
						<Card style = { style.card } >
							<CardTitle style = { style.title } >
								Update patient
							</CardTitle>
							<CardBody>
								<Form>
									<Row>
										{/* Firstname */}
										<Col xl={5} lg={5} md={5} sm={12} xs={12} style = { style.formCol }>
											<FormGroup>
												<Input
													type = "text"
													name = "firstname"
													value = { this.state.firstname }
													onChange = { this.handleInput }
													style = { style.input }
													placeholder = { this.props.patients.firstname }
													invalid = { this.state.validationErrors ? true : false }>
												</Input>
												{ this.state.validationErrors.firstname &&
															<FormFeedback invalid>
																{ this.state.validationErrors.firstname.message }
															</FormFeedback>
												}
											</FormGroup>
										</Col>
										{/* Lastname */}
										<Col xl={5} lg={5} md={5} sm={12} xs={12} style = { style.formCol }>
											<FormGroup>
												<Input
													type = "text"
													name = "lastname"
													value = { this.state.lastname }
													onChange = { this.handleInput }
													style = { style.input }
													placeholder = { this.props.patients.lastname }
													invalid = { this.state.validationErrors ? true : false }>
												</Input>
												{ this.state.validationErrors.lastname &&
															<FormFeedback invalid>
																{ this.state.validationErrors.lastname.message }
															</FormFeedback>
												}
											</FormGroup>
										</Col>
										{/* Gender */}
										<Col xl={2} lg={2} md={2} sm={12} xs={12} style = { style.formCol }>
											<FormGroup>
												<Input
													type = "select"
													name = "gender"
													value = { this.state.gender }
													onChange = { this.handleInput }
													style = { style.input }
													invalid = { this.state.validationErrors ? true : false }>
													<option value="" disabled>{ this.props.patients.gender }</option>
													<option value="Male">Male</option>
													<option value="Female">Female</option>
												</Input>
												{ this.state.validationErrors.gender &&
													<FormFeedback invalid>
														{ this.state.validationErrors.gender.message }
													</FormFeedback>
												}
											</FormGroup>
										</Col>
									</Row>
									<Row>
										{/* SSN */}
										<Col xl={4} lg={4} md={4} sm={12} xs={12} style = { style.formCol }>
											<FormGroup>
												<Input
													type = "text"
													name = "ssn"
													value = { this.state.ssn }
													onChange = { this.handleInput }
													style = { style.input }
													placeholder = { this.props.patients.ssn }
													invalid = { this.state.validationErrors ? true : false }>
												</Input>
												{ this.state.validationErrors.ssn &&
													<FormFeedback invalid>
														{ this.state.validationErrors.ssn.message }
													</FormFeedback>
												}
											</FormGroup>
										</Col>
										{/* Age */}
										<Col xl={2} lg={2} md={2} sm={12} xs={12} style = { style.formCol }>
											<FormGroup>
												<Input
													type = "text"
													name = "age"
													value = { this.state.age }
													onChange = { this.handleInput }
													style = { style.input }
													placeholder = { this.props.patients.age }
													invalid = { this.state.validationErrors ? true : false }>
												</Input>
												{ this.state.validationErrors.age &&
															<FormFeedback invalid>
																{ this.state.validationErrors.age.message }
															</FormFeedback>
												}
											</FormGroup>
										</Col>
										{/* Height */}
										<Col xl={3} lg={3} md={3} sm={12} xs={12} style = { style.formCol }>
											<FormGroup>
												<Input
													type = "text"
													name = "height"
													value = { this.state.height }
													onChange = { this.handleInput }
													style = { style.input }
													placeholder = { this.props.patients.height }
													invalid = { this.state.validationErrors ? true : false }>
												</Input>
												{ this.state.validationErrors.height &&
															<FormFeedback invalid>
																{ this.state.validationErrors.height.message }
															</FormFeedback>
												}
											</FormGroup>
										</Col>
										{/* Weight */}
										<Col xl={3} lg={3} md={3} sm={12} xs={12} style = { style.formCol }>
											<FormGroup>
												<Input
													type = "text"
													name = "weight"
													value = { this.state.weight }
													onChange = { this.handleInput }
													style = { style.input }
													placeholder = { this.props.patients.weight }
													invalid = { this.state.validationErrors ? true : false }>
												</Input>
												{ this.state.validationErrors.weight &&
													<FormFeedback invalid>
														{ this.state.validationErrors.weight.message }
													</FormFeedback>
												}
											</FormGroup>
										</Col>
									</Row>
									<Row>
										{/* Street */}
										<Col xl={5} lg={5} md={5} sm={12} xs={12} style = { style.formCol }>
											<FormGroup>
												<Input
													type = "text"
													name = "street"
													value = { this.state.street }
													onChange = { this.handleInput }
													style = { style.input }
													placeholder = { this.props.patients.address.street }
													invalid = { this.state.validationErrors ? true : false }>
												</Input>
												{ this.state.validationErrors.street &&
													<FormFeedback invalid>
														{ this.state.validationErrors.street.message }
													</FormFeedback>
												}
											</FormGroup>
										</Col>
										{/* City */}
										<Col xl={3} lg={3} md={3} sm={12} xs={12} style = { style.formCol }>
											<FormGroup>
												<Input
													type = "select"
													name = "city"
													value = { this.state.city }
													onChange = { this.handleInput }
													style = { style.input }
													placeholder = { this.props.patients.address.city }
													invalid = { this.state.validationErrors ? true : false }>
													<option value= { this.props.patients.address.city }>{ this.props.patients.address.city }</option>
													{ 
														cities.map((city, i) => {
															return <option value = { city } key = { i }>
																{ city }
															</option>
														})
													}
												</Input>
												{ this.state.validationErrors.city &&
													<FormFeedback invalid>
														{ this.state.validationErrors.city.message }
													</FormFeedback>
												}
											</FormGroup>
										</Col>
										{/* Zipcode */}
										<Col xl={4} lg={4} md={4} sm={12} xs={12} style = { style.formCol }>
											<FormGroup>
												<Input
													type = "text"
													name = "postal"
													value = { this.state.postal }
													onChange = { this.handleInput }
													style = { style.input }
													placeholder = { this.props.patients.address.postal }
													invalid = { this.state.validationErrors ? true : false }>
												</Input>
												{ this.state.validationErrors.postal &&
													<FormFeedback invalid>
														{ this.state.validationErrors.postal.message }
													</FormFeedback>
												}
											</FormGroup>
										</Col>
									</Row>
									<Row>
										{/* State */}
										<Col xl={4} lg={4} md={4} sm={12} xs={12} style = { style.formCol }>
											<FormGroup>
												<Input
													type = "select"
													name = "state"
													value = { this.state.state }
													onChange = { this.handleInput }
													style = { style.input }
													placeholder = { this.props.patients.address.state }
													invalid = { this.state.validationErrors ? true : false }>
													<option value="" disabled>{ this.props.patients.address.state }</option>
													{ 
														states.map((state, i) => {
															return <option value = { state } key = {i}>
																{ state }
															</option>
														})
													}
												</Input>
												{ this.state.validationErrors.state &&
															<FormFeedback invalid>
																{ this.state.validationErrors.state.message }
															</FormFeedback>
												}
											</FormGroup>
										</Col>
										{/* Insurance */}
										<Col xl={8} lg={8} md={8} sm={12} xs={12} style = { style.formCol }>
											<FormGroup>
												<Input
													type = "text"
													name = "insurance"
													value = { this.state.insurance }
													onChange = { this.handleInput }
													style = { style.input }
													placeholder = { this.props.patients.insurance }
													invalid = { this.state.validationErrors ? true : false }>
												</Input>
												{ this.state.validationErrors.insurance &&
															<FormFeedback invalid>
																{ this.state.validationErrors.insurance.message }
															</FormFeedback>
												}
											</FormGroup>
										</Col>
									</Row>
									<Row>
										<Col>
											{ this.props.errors && 
												<Alert color = { this.props.errors.color } >
													{ this.props.errors.message }
												</Alert>
											}
											<Button onClick = { this.onSubmit } className="float-right btn-patient">
												<i className="fas fa-plus-circle"></i>&nbsp;Update Patient
											</Button>
										</Col>
									</Row>
								</Form>
							</CardBody>
						</Card>
					</Col>
				</Row>
				}
				<Row>
					<Col style = {{ marginTop: '20px' }}>
						<Link to = "/patient" className = "btn float-right btn-login">
							<i className="fas fa-backward"></i>&nbsp;Go Back
						</Link>
					</Col>
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		patients: state.updatePatient.patient,
		errors: state.updatePatient.alert
	}
}

export default connect(mapStateToProps)(UpdatePatient);