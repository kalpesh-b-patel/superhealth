import { put, takeEvery } from 'redux-saga/effects';
import * as PatientActions from './PatientActions';
import PatientConstants from './PatientConstants';

const BASE_URL = 'http://localhost:8080/patient';

export function* handleUpdatePatient() {
	yield takeEvery(PatientConstants.GET_PATIENTS_BY_ID, getPatientById);
	yield takeEvery(PatientConstants.UPDATE_PATIENT, updatePatientById);
}

function* getPatientById(action) {
	let header = httpHeader('GET');
	let alert = '';
	try {
		const response = yield fetch(`${ BASE_URL }/id/${ action.id }`, header);
		if(response.ok) {
			const payload = yield response.json();
			yield put(PatientActions.setPatient(payload));
		}
		else {
			const error = yield response.json();
			alert = {
				status: false,
				color: 'danger',
				message: error.message
			};
			yield put(PatientActions.setAlert(alert));
		}
	}
	catch(error) {
		alert = {
			status: false,
			color: 'danger',
			message: 'Sorry, couldn\'t connect to server. Please try again later'
		};
		yield put(PatientActions.setAlert(alert));
	}
}

function* updatePatientById(action) {
	let header = httpHeader('PUT');
	header.body = JSON.stringify(action.patient);
	let alert = '';
	try {
		const response = yield fetch(`${ BASE_URL }`, header);
		if(response.ok) {
			const payload = yield response.json();
			alert = {
				status: true,
				color: 'success',
				message: payload.message
			};
			yield put(PatientActions.setAlert(alert));
		}
		else {
			const error = yield response.json();
			alert = {
				status: false,
				color: 'danger',
				message: error.message
			};
			yield put(PatientActions.setAlert(alert));
		}
	}
	catch(error) {
		alert = {
			status: false,
			color: 'danger',
			message: 'Sorry, couldn\'t connect to server. Please try again later'
		};
		yield put(PatientActions.setAlert(alert));
	}
}

const httpHeader = method => {
	let header = {
		'method': method,
		'headers': new Headers({
			'Content-Type': 'application/json; charset=utf-8',
			'Authorization': `${ localStorage.getItem('type') } ${ localStorage.getItem('token') }`
		})
	};
	return header;
};