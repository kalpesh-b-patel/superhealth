import LoginConstants from './LoginConstants';

export const authenticateUser = user => {
	return {
		type: LoginConstants.AUTHENTICATE_USER,
		user
	};
};

export const setAuthenticationStatus = alert => {
	return {
		type: LoginConstants.SET_AUTHENTICATION,
		alert
	};
};

export const logoutUser = () => {
	return {
		type: LoginConstants.UNAUTHENTICATE_USER
	};
};

export const resetAlert = () => {
	return {
		type: LoginConstants.RESET_ALERT
	};
};