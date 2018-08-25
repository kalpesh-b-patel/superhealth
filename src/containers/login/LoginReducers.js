import LoginConstants from './LoginConstants';

const initState = {
	alert: ''
};

const LoginReducers = (state = initState, action) => {
	switch(action.type) {
		case LoginConstants.AUTHENTICATE_USER:
			return { ...state };
		case LoginConstants.SET_AUTHENTICATION:
			state.alert = action.alert;
			return { ...state, alert: { ...state.alert } };
		case LoginConstants.UNAUTHENTICATE_USER:
			state.alert = {
				status: false,
				color: 'success',
				message: 'You have successfully logged out!'
			};
			return { ...state, alert: { ...state.alert } };
		case LoginConstants.RESET_ALERT:
			state.alert = '';
			return { ...state };
		default:
			return { ...state };
	}
};

export default LoginReducers;