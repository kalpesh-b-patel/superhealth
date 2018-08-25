import { put, takeEvery } from 'redux-saga/effects';
import * as LoginActions from './LoginActions';
import LoginConstants from './LoginConstants';

const BASE_URL = 'http://localhost:8080/auth';

export function* handleAuthentication() {
	yield takeEvery(LoginConstants.AUTHENTICATE_USER, authenticateUser);
}

function* authenticateUser(action) {
	let header = httpHeader('POST');
	header.body = JSON.stringify(action.user);
	let alert = '';

	try {
		const response = yield fetch(`${ BASE_URL }/signin`, header);
		if(response.ok) {
			const payload = yield response.json();
			yield setLocalStorage(payload.tokenType, payload.accessToken, payload.email, payload.isAdmin );
			alert = {
				status: true,
				color: 'success',
				message: 'Login success'
			};
			yield put(LoginActions.setAuthenticationStatus(alert));
		}
		else {
			const error = yield response.json();
			yield removeLocalStorage();
			alert = {
				status: false,
				color: 'danger',
				message: error.message
			};
			yield put(LoginActions.setAuthenticationStatus(alert));
		}
	}
	catch(error) {
		alert = {
			status: false,
			color: 'danger',
			message: 'Sorry, couldn\'t connect to server. Please try again later'
		};
		yield put(LoginActions.setAuthenticationStatus(alert));
	}
}

const httpHeader = method => {
	let header = {
		'method': method,
		'headers': new Headers({
			'Content-Type': 'application/json; charset=utf-8'
		})
	};
	return header;
};

function setLocalStorage(type, token, email, isAdmin) {
	localStorage.setItem('isAuthenticated', 'true');
	localStorage.setItem('type', type);
	localStorage.setItem('token', token);
	localStorage.setItem('email', email);
	localStorage.setItem('isAdmin', isAdmin);
}

function removeLocalStorage() {
	localStorage.removeItem('isAuthenticated');
	localStorage.removeItem('type');
	localStorage.removeItem('token');
	localStorage.removeItem('email');
	localStorage.removeItem('isAdmin');
}