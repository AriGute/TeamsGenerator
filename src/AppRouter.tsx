import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TeamGeneratorDashBoard from './components/TeamGeneratorPage/TeamsDisplay/TeamGeneratorDashBoard';
import About from './components/AboutPage/About';
import Layout from './components/Layout';

const AppRouter = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <TeamGeneratorDashBoard />,
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
root?.render(<RouterProvider router={AppRouter} />);
