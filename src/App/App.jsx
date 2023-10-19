import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import './App.scss';
import Header from '../components/Header';
import Results from '../components/Results';
import { ResultProvider } from '../components/ResultContext';

function App() {
  return (
	<ResultProvider>
		<Router>
			<Header />
			<Routes>
				<Route exact path="/" element={<Results />} />
			</Routes>
		</Router>
	</ResultProvider>
  );
}

export default App;
