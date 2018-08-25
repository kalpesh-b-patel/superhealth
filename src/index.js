import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './containers/app/App';
import 'bootstrap/dist/css/bootstrap.min.css';

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<Provider store = { store } >
			<Router>
				<App />
			</Router>
		</Provider>,
		document.getElementById('root')
	);
});