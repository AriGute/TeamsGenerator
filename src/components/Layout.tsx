import { Outlet, Link } from 'react-router-dom';

import Header from './Header';
import React from 'react';

const Layout = () => {
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
export default Layout;
