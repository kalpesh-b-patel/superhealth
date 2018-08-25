import { put, takeEvery } from 'redux-saga/effects';
import * as PatientActions from './PatientActions';
import PatientConstants from './PatientConstants';

const BASE_URL = 'http://localhost:8080/patient';

export function* handlePatient() {
	yield takeEvery(PatientConstants.GET_PATIENTS, getAllPatients);
	yield takeEvery(PatientConstants.DELETE_PATIENT, deletePatient);
	yield takeEvery(PatientConstants.ADD_PATIENT, addNewPatient);
}

function* getAllPatients(action) {
	let header = httpHeader('GET');
	let alert = '';
	try {
		const response = yield fetch(BASE_URL, header);
		if(response.ok) {
			const payload = yield response.json();
			yield put(PatientActions.setPatients(payload));
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

function* deletePatient(action) {
	let header = httpHeader('DELETE');
	let alert = '';
	try {
		const response = yield fetch(`${ BASE_URL }/id/${ action.id }`, header);
		if(response.ok) {
			yield put(PatientActions.getAllPatients());
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

function* addNewPatient(action) {
	let header = httpHeader('POST');
	header.body = JSON.stringify(action.newPatient);
	let alert = '';
	try {
		const response = yield fetch(BASE_URL, header);
		if(response.ok) {
			const success = yield response.json();
			alert = {
				status: true,
				color: 'success',
				message: success.message
			};
			yield put(PatientActions.setAlert(alert));
			yield put(PatientActions.getAllPatients());
		}
		else {
			const error = yield response.json();
			alert = {
				status: false,
				color: 'danger',
				message: error.message
			};
			yield put(PatientActions.setAlert(alert));
			yield put(PatientActions.getAllPatients());
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