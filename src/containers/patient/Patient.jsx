import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as PatientActions from './PatientActions';
import {
	Container,
	Row,
	Col,
	Nav,
	NavItem,
	NavLink,
	Table,
	Card,
	CardTitle,
	CardBody,
	Form,
	FormGroup,
	FormFeedback,
	Input,
	Button,
	Alert,
	Modal,
	ModalHeader,
	ModalFooter,
	ModalBody
} from 'reactstrap';
import states from '../../misc/states';
import cities from '../../misc/cities';
import './Patient.css';

class Patient extends Component {
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
			
			// other
			isAuthenticated: false,
			patient: [],
			view: true,
			add: false,
			validationErrors: '',
			generalErrors: '',

			// Modal
			modal: false,
			deleteId: '',
			updateId: ''
		}
	}

	handleInput = event => {
		const { name, value } = event.target;
        this.setState({
            [name]: value,
			validationErrors: '',
			generalErrors: ''
        });
	}

	handleClick = tab => {
		this.props.dispatch(PatientActions.resetAlert());
		switch(tab) {
			case 'view':
				if(!this.props.patients) {
					this.props.dispatch(PatientActions.getAllPatients());
				}
				this.setState({
					view: true,
					add: false,
					validationErrors: ''
				});
				this.reset();
				break;
			case 'add':
				this.setState({
					view: false,
					add: true
				});
				break;
			default:
				return;
		}
	}

	handleModal = id => {
		this.setState({
			deleteId: id,
			modal: !this.state.modal
		});
	}

	handleCancel = () => {
		this.setState({
			deleteId: '',
			modal: false
		});
	}

	handleDelete = () => {
		this.props.dispatch(PatientActions.deletePatient(this.state.deleteId));
		this.setState({
			deleteId: '',
			modal: false
		});
	}

	handleUpdate = () => {

	}
	onSubmit = event => {
		event.preventDefault();
		const isValid = this.validate();
		if(isValid) {
			// this.setState({
			// 	generalErrors: {
			// 		color: 'success',
			// 		message: 'New patient has been added successfully'
			// 	}
			// });
			const newPatient = {
				firstname: this.state.firstname,
				lastname: this.state.lastname,
				ssn: this.state.ssn,
				address: {
					street: this.state.street,
					city: this.state.city,
					state: this.state.state,
					postal: this.state.postal
				},
				age: this.state.age,
				gender: this.state.gender,
				height: this.state.height,
				weight: this.state.weight,
				insurance: this.state.insurance
			}
			this.props.dispatch(PatientActions.addPatient(newPatient));
			this.reset();
		}
	}

	validate = () => {
		let errors = {};
		if(
			this.state.firstname !== '' &&
			this.state.lastname !== '' &&
			this.state.gender !== '' &&
			this.state.ssn !== '' &&
			this.state.age !== '' &&
			this.state.height !== '' &&
			this.state.weight !== '' &&
			this.state.street !== '' &&
			this.state.city !== '' &&
			this.state.postal !== '' &&
			this.state.state !== '' &&
			this.state.insurance !== ''
		) {
			let isSSNValid = false;
			let isAgeValid = false;
			let isHeightValid = false;
			let isWeightValid = false;
			let isZipcodeValid = false;
			
			// SSN Validation
			if(this.state.ssn !== '') {
				if(!this.ssnValidator(this.state.ssn)) {
					errors.ssn = {
						state: 'invalid',
						message: 'Invalid SSN format'
					};
				}
				else
					isSSNValid = true;
			}

			// Age Validation
			if(this.state.age !== '') {
				if(!this.numberRequired(this.state.age)) {
					errors.age = {
						state: 'invalid',
						message: 'Invalid age value'
					};
				}
				else
					isAgeValid = true;
			}

			// Height Validation
			if(this.state.height !== '') {
				if(!this.numberRequired(this.state.height)) {
					errors.height = {
						state: 'invalid',
						message: 'Invalid height value'
					};
				}
				else
					isHeightValid = true;
			}

			// Weight Validation
			if(this.state.weight !== '') {
				if(!this.numberRequired(this.state.weight)) {
					errors.weight = {
						state: 'invalid',
						message: 'Invalid weight value'
					};
				}
				else
					isWeightValid = true;
			}

			// Zipcode Validator
			if(this.state.postal !== '') {
				if(!this.zipcodeValidator(this.state.postal)) {
					errors.postal = {
						state: 'invalid',
						message: 'Invalid zipcode value'
					};
				}
				else
					isZipcodeValid = true;
			}

			if(isSSNValid && isAgeValid && isHeightValid && isWeightValid && isZipcodeValid)
				return true;
			else {
				this.setState({
					validationErrors: errors
				});
			}
		}
		else {
			// Firstname
			if(this.state.firstname === '') {
				errors.firstname = {
					state: 'invalid',
					message: 'Firstname is required'
				};
			}

			// Lastname
			if(this.state.lastname === '') {
				errors.lastname = {
					state: 'invalid',
					message: 'Lastname is required'
				};
			}

			// Gender
			if(this.state.gender === '') {
				errors.gender = {
					state: 'invalid',
					message: 'Gender is required'
				};
			}

			// SSN
			if(this.state.ssn === '') {
				errors.ssn = {
					state: 'invalid',
					message: 'SSN is required'
				};
			}

			// Age
			if(this.state.age === '') {
				errors.age = {
					state: 'invalid',
					message: 'Age is required'
				};
			}

			// Height
			if(this.state.height === '') {
				errors.height = {
					state: 'invalid',
					message: 'Height is required'
				};
			}

			// Weight
			if(this.state.weight === '') {
				errors.weight = {
					state: 'invalid',
					message: 'Weight is required'
				};
			}

			// Street
			if(this.state.street === '') {
				errors.street = {
					state: 'invalid',
					message: 'Street is required'
				};
			}

			// City
			if(this.state.city === '') {
				errors.city = {
					state: 'invalid',
					message: 'City is required'
				};
			}

			// Zipcode
			if(this.state.postal === '') {
				errors.postal = {
					state: 'invalid',
					message: 'Zipcode is required'
				};
			}

			// State
			if(this.state.state === '') {
				errors.state = {
					state: 'invalid',
					message: 'State is required'
				};
			}

			// Insurance
			if(this.state.insurance === '') {
				errors.insurance = {
					state: 'invalid',
					message: 'Insurance is required'
				};
			}

			this.setState({
				validationErrors: errors
			});
			return false;
		}
	}

	ssnValidator = ssn => {
		// let ssnPattern = /^[0-9]{3}\-?[0-9]{2}\-?[0-9]{4}$/;
		let ssnPattern = /^[0-9]{3}-?[0-9]{2}-?[0-9]{4}$/;
		return ssnPattern.test(ssn);
	}

	numberRequired = input => {
		let numberPattern = /^\d+$/;
		return numberPattern.test(input);
	}

	zipcodeValidator = input => {
		let zipPattern = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
		return zipPattern.test(input);
	}

	reset() {
		this.setState({
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
			insurance: ''
		});
	}

	componentDidMount() {
		this.props.dispatch(PatientActions.resetAlert());
		this.props.dispatch(PatientActions.getAllPatients());
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
			<Fragment>
				{
					!localStorage.getItem('isAuthenticated') &&
						<Redirect to = "/" />
				}
				<Container style = { style.container } >
					<Row>
						<Col xl={12} lg={12} md={12} sm={12} xs={12}>
							<Nav tabs style = { style.nav } >
								<NavItem>
									<NavLink 
										href="#view-patient"
										onClick = { () => this.handleClick('view') }
										active = { this.state.view } >View Patient</NavLink>
								</NavItem>

								{ localStorage.getItem("isAdmin") === "true" &&
									<NavItem>
										<NavLink
											href="#add-patient"
											onClick = { () => this.handleClick('add') }
											active = { this.state.add} >Add Patient</NavLink>
									</NavItem>
								}
							</Nav>
						</Col>
					</Row>
					{/* View Patient */}
					{ this.state.view &&
						<Row>
							<Col>
								{ this.props.errors && 
									<Alert color = { this.props.errors.color } >
										{ this.props.errors.message }
									</Alert>
								}
							</Col>
						
							<Col xl={12} lg={12} md={12} sm={12} xs={12} id="view-patient" style = { style.view } >
								<Table striped bordered size="sm">
									<thead style = { style.thead }>
										<tr>
											<th>#</th>
											<th>Name</th>
											<th>Age</th>
											<th>Gender</th>
											<th style = { style.right }>
												{ localStorage.getItem("isAdmin") === 'true' ? 'View Edit Delete' : 'View' }
											</th>
											{/* { localStorage.getItem("isAdmin") === 'true' &&
												<th style = { style.right }>Edit</th>
											}
											{ localStorage.getItem("isAdmin") === 'true' &&
												<th style = { style.right }>Delete</th>
											} */}
										</tr>
									</thead>
									<tbody>
										{ this.props.patients ? 
											this.props.patients.map( (patient, i) => {
												return <tr key = { i }>
													<th scope="row"> { i + 1 } </th>
													<td> { patient.firstname }&nbsp;{ patient.lastname } </td>
													<td> { patient.age } </td>
													<td> { patient.gender } </td>
													<td style = { style.right }>
														{/* View Button */}
														<Link
															className = "btn btn-view btn-sm"
															to = { '/patient/id/' + patient._id }
														>
															<i className="fas fa-user"></i>
														</Link>&nbsp;&nbsp;
														{ localStorage.getItem("isAdmin") === 'true' &&
															<Fragment>
																{/* Edit Button */}
																<Link className = "btn btn-update btn-sm"
																	to = { '/patient/update/id/' + patient._id }
																>
																	<i className="fas fa-pen-square"></i>	
																</Link>&nbsp;&nbsp;
																{/* Delete Button */}
																<Button
																	className = "btn btn-danger btn-sm"
																	onClick = { () => this.handleModal(patient._id) }
																>
																	<i className="fas fa-trash-alt"></i>
																</Button>
															</Fragment>
														}
													</td>
												</tr>
											})
											: 
											!this.props.errors ?
												<tr>
													<td colSpan="5">
														<img src="/images/Loading_icon.gif" alt="Loading..." style = { style.loading } />
													</td>
												</tr>:
												null
										}
									</tbody>
								</Table>
							</Col>
						</Row>
					}

					{/* Add Patient */}
					{ this.state.add &&
						<Row>
							<Col xl={12} lg={12} md={12} sm={12} xs={12} id="add-patient" style = { style.add } >
								<Card style = { style.card } >
									<CardTitle style = { style.title } >
										Add new patient
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
															placeholder = "Firstname"
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
															placeholder = "Lastname"
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
															<option value="" disabled>Gender...</option>
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
															placeholder = "SSN (Format: 123-45-6789)"
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
															placeholder = "Age"
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
															placeholder = "Height (in inches)"
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
															placeholder = "Weight (in pounds)"
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
															placeholder = "Street"
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
															placeholder = "City"
															invalid = { this.state.validationErrors ? true : false }>
															<option value="" disabled>City...</option>
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
															placeholder = "Zipcode"
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
															placeholder = "State"
															invalid = { this.state.validationErrors ? true : false }>
															<option value="" disabled>State...</option>
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
															placeholder = "Insurance provider"
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
														<i className="fas fa-plus-circle"></i>&nbsp;Add Patient
													</Button>
												</Col>
											</Row>
										</Form>
									</CardBody>
								</Card>
							</Col>
						</Row>
					}
					{/* Modal */}
					<Modal isOpen={this.state.modal} toggle={this.handleModal} >
						<ModalHeader toggle={this.handleModal} style = { style.modalHeader } >
							Are you sure want to delete this patient?
						</ModalHeader>
						<ModalBody style = { style.modalBody }>
							<i className="fas fa-exclamation-triangle"></i>&nbsp;This action cannot be undone
          				</ModalBody>
						<ModalFooter>
							<Button color="danger" onClick = { this.handleDelete }>
								<i className="fas fa-trash-alt"></i>&nbsp;Yes, Delete</Button>
							<Button color="secondary" onClick = { this.handleCancel }>
								No
							</Button>
						</ModalFooter>
					</Modal>
				</Container>
			</Fragment>
		);
	}
}

export default connect(state => {
	return {
		patients: state.patient.patients,
		errors: state.patient.alert
	};
})(Patient);

