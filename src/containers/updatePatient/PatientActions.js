import PatientConstants from './PatientConstants';

export const getPatientById = (id) => {
	return {
		type: PatientConstants.GET_PATIENTS_BY_ID,
		id
	};
};

export const updatePatient = patient => {
	return {
		type: PatientConstants.UPDATE_PATIENT,
		patient
	};
};

export const setPatient = patient => {
	return {
		type: PatientConstants.SET_PATIENT,
		patient
	};
};

export const setAlert = alert => {
	return {
		type: PatientConstants.SET_ALERT,
		alert
	};
};

export const resetAlert = alert => {
	return {
		type: PatientConstants.RESET_ALERT,
		alert
	};
};