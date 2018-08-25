import PatientConstants from './PatientConstants';

export const getAllPatients = () => {
	return {
		type: PatientConstants.GET_PATIENTS
	};
};

export const addPatient = newPatient => {
	return {
		type: PatientConstants.ADD_PATIENT,
		newPatient
	};
};

export const setPatients = patients => {
	return {
		type: PatientConstants.SET_PATIENTS,
		patients
	};
};

export const deletePatient = id => {
	return {
		type: PatientConstants.DELETE_PATIENT,
		id
	};
};

export const setAlert = alert => {
	return {
		type: PatientConstants.SET_ALERT,
		alert
	};
};

export const resetAlert = () => {
	return {
		type: PatientConstants.RESET_ALERT
	};
};