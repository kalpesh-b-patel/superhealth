import PatientConstants from './PatientConstants';

const initState = {
	patients: '',
	alert: ''
};

const PatientReducers = ( state = initState, action ) => {
	switch(action.type) {
		case PatientConstants.GET_PATIENTS:
			return { ...state };
		case PatientConstants.ADD_PATIENT:
			state.patients = action.newPatient;
			return { ...state };
		case PatientConstants.SET_PATIENTS:
			state.patients = action.patients;
			return { ...state };
		case PatientConstants.SET_ALERT:
			state.alert = action.alert;
			return { ...state };
		case PatientConstants.RESET_ALERT:
			state.alert = '';
			return { ...state };
		default:
			return { ...state };
	}
};

export default PatientReducers;