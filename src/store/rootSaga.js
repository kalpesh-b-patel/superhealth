import { handleAuthentication } from '../containers/login/saga';
import { handlePatient } from '../containers/patient/saga';
import { handleViewPatient } from '../containers/viewPatient/saga';
import { handleUpdatePatient } from '../containers/updatePatient/saga';

import { fork } from 'redux-saga/effects';

function* rootSaga() {
	yield [
		fork(handleAuthentication),
		fork(handlePatient),
		fork(handleViewPatient),
		fork(handleUpdatePatient)
	];
}

export default rootSaga;