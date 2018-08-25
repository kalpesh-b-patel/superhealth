import { combineReducers } from 'redux';
import LoginReducers from '../containers/login/LoginReducers';
import PatientReducers from '../containers/patient/PatientReducers';
import ViewPatientReducers from '../containers/viewPatient/PatientReducers';
import UpdatePatientReducers from '../containers/updatePatient/PatientReducers';

const reducers = combineReducers({
	authentication: LoginReducers,
	patient: PatientReducers,
	viewPatient: ViewPatientReducers,
	updatePatient: UpdatePatientReducers
});

export default reducers;