import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as PatientActions from './PatientActions';
import {
	Container,
	Row,
	Col,
	Card,
	CardHeader,
	CardBody
} from 'reactstrap';

class ViewPatient extends Component {
	constructor(props) {
		super(props);
		this.state = {
			patient: ''
		};
	}

	componentDidMount() {
		const id = this.props.match.params.patient_id;
		this.props.dispatch(PatientActions.getPatientById(id));
	}

	render() {
		const style = {
			container: {
				minHeight: 'calc(100vh - 152px)'
			},
			profilePicture: {
				marginTop: '20px',
				display: 'block',
				textAlign: 'center'
			},
			profile: {
				marginTop: '20px'
			},
			cardHeader: {
				backgroundColor: '#1C2232',
				color: '#FFF'
			},
			round: {
				borderRadius: '50%'
			},
			span: {
				fontWeight: 'bold',
				color: '#1C2232'
			}
		};
		return (
			<Container style = { style.container } >
				{
					!localStorage.getItem('isAuthenticated') &&
						<Redirect to = "/" />
				}
				<Row>
					{/* Profile picture */}
					<Col xl = {2} lg = {2} md = {2} sm = {12} xs = {12} style = { style.profilePicture }>
						<img src="/images/health.png" alt="Patient Profile" className="img-fluid" style = { style.round }/>
					</Col>
					{/* Profile */}
					{ this.props.patient &&
						<Col xl = {10} lg = {10} md = {10} sm = {12} xs = {12} style = { style.profile } >
							<Card>
								<CardHeader style = { style.cardHeader } >Patient Profile</CardHeader>
								<CardBody>
									<Row>
										<Col xl={4} lg={4} md={4} sm={12} xs={12}><span style = { style.span} >Firstname: </span>{ this.props.patient.firstname }</Col>
										<Col xl={4} lg={4} md={4} sm={12} xs={12}><span style = { style.span} >Lastname: </span>{ this.props.patient.lastname }</Col>
										<Col xl={4} lg={4} md={4} sm={12} xs={12}><span style = { style.span} >SSN: </span>{ this.props.patient.ssn }</Col>
									</Row>
									<Row>
										<Col xl={4} lg={4} md={4} sm={12} xs={12}><span style = { style.span} >Gender: </span>{ this.props.patient.gender }</Col>
										<Col xl={4} lg={4} md={4} sm={12} xs={12}><span style = { style.span} >Height(inches): </span>{ this.props.patient.height }</Col>
										<Col xl={4} lg={4} md={4} sm={12} xs={12}><span style = { style.span} >Weight(pounds): </span>{ this.props.patient.weight }</Col>
									</Row>
									<Row>
										<Col xl={4} lg={4} md={4} sm={12} xs={12}><span style = { style.span} >Age: </span>{ this.props.patient.age }</Col>
										<Col xl={4} lg={4} md={4} sm={12} xs={12}><span style = { style.span} >Insurance Company: </span>{ this.props.patient.insurance }</Col>
										<Col xl={4} lg={4} md={4} sm={12} xs={12}></Col>
									</Row>
								</CardBody>
							</Card>
						</Col>
					}
				</Row>

				{/* Address */}
				{ this.props.patient.address && 
					<Row>
						<Col xl = {{ size: 10, offset: 2 }} lg = {{ size: 10, offset: 2 }} md = {{ size: 10, offset: 2 }} sm = {12} xs = {12} style = { style.profile } >
							<Card>
								<CardHeader style = { style.cardHeader } >Patient Address</CardHeader>
								<CardBody>
									<Row>
										<Col xl={6} lg={6} md={6} sm={12} xs={12}><span style = { style.span} >Street: </span>{ this.props.patient.address.street }</Col>
										<Col xl={6} lg={6} md={6} sm={12} xs={12}><span style = { style.span} >City: </span>{ this.props.patient.address.city }</Col>
									</Row>
									<Row>
										<Col xl={6} lg={6} md={6} sm={12} xs={12}><span style = { style.span} >State: </span>{ this.props.patient.address.state }</Col>
										<Col xl={6} lg={6} md={6} sm={12} xs={12}><span style = { style.span} >Zipcode: </span>{ this.props.patient.address.postal }</Col>
									</Row>
								</CardBody>
							</Card>
						</Col>
					</Row>
				}

				{/* Encounter */}
				{/* <Row>
					<Col xl = {{ size: 10, offset: 2 }} lg = {{ size: 10, offset: 2 }} md = {{ size: 10, offset: 2 }} sm = {12} xs = {12} style = { style.profile } >
						<Card>
							<CardHeader style = { style.cardHeader } >Patient Encounters</CardHeader>
							<CardBody>
								<Row>
									<Col>Coming soon...</Col>
								</Row>
							</CardBody>
						</Card>
					</Col>
				</Row> */}
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

export default connect(state => {
	return {
		patient: state.viewPatient.patient
	};
})(ViewPatient);
