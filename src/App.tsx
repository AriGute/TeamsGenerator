import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet, Link } from 'react-router-dom';
import TeamGenerator from './components/TeamGeneratorPage/TeamsDisplay/TeamGenerator';
import About from './components/AboutPage/About';
import Header from './components/Header';
import React from 'react';

const App = () => {
	return (
		<div className='   w-screen min-h-full bg-blue-100 absolute top-0'>
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

const element: HTMLElement | null = document.getElementById('root');
const root = element && ReactDOM.createRoot(element);
root && root.render(<RouterProvider router={appRouter} />);
