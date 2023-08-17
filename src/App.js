import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet, Link } from 'react-router-dom';
import TeamGenerator from './components/TeamGeneratorPage/TeamGenerator';
import About from './components/AboutPage/About';
import Header from './components/Header';

const App = () => {
	return (
		<div className='   w-screen h-screen bg-blue-100 absolute top-0'>
			<Header />
			<Outlet />
			<div className='text-center'>
				<br />
				<Link to='/about' className='p-3 m-3'>
					about
				</Link>
				<Link to='/' className='p-3 m-3'>
					home
				</Link>
			</div>
		</div>
	);
};

const appRouter = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <TeamGenerator />,
			},
			{
				path: '/about',
				element: <About />,
			},
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={appRouter} />);
