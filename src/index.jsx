import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.scss';
import App from './App/App';

const root = createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
