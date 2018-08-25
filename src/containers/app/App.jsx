import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../../components/footer/Footer';
import Home from '../../components/home/Home';
import Patient from '../../containers/patient/Patient';
import ViewPatient from '../viewPatient/ViewPatient';
import UpdatePatient from '../updatePatient/UpdatePatient';
import Logout from '../../containers/logout/Logout';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAuthenticated: 'false'
		};
	}
	
	render() {
		return (
			<Fragment>
				<Header isAuthenticated = { localStorage.getItem('isAuthenticated') } />
				<Switch>
					<Route exact path = "/" component = { Home } />
					<Route path = "/patient/update/id/:patient_id" component = { UpdatePatient } />
					<Route path = "/patient/id/:patient_id" component = { ViewPatient } />
					<Route path = "/patient" component = { Patient } />
					<Route path = "/logout" component = { Logout } />
				</Switch>
				<Footer />
			</Fragment>
		);
	}
}

export default App;
