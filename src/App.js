import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TeamGenerator from './components/TeamGenerator';
import About from './components/About';
import Header from './components/Header';

const App = () => {
	return (
		<div className=' w-screen h-screen bg-blue-100 absolute top-0'>
      <Header />
			<TeamGenerator />
		</div>
	);
};

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/about',
		element: <About />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={router} />);
