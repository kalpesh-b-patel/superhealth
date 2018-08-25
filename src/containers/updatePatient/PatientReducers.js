import PatientConstants from './PatientConstants';

const initState = {
	patient: '',
	alert: ''
};

const PatientReducers = ( state = initState, action ) => {
	switch(action.type) {
		case PatientConstants.GET_PATIENTS_BY_ID:
			return { ...state };
		case PatientConstants.SET_PATIENT:
			state.patient = action.patient;
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