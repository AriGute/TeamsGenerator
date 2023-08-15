import ReactDOM from 'react-dom';
import Header from './components/Header';
import React from 'react';

const root = ReactDOM.createRoot(document.querySelector('root'));

const App = () => {
	return <div>{<Header />}</div>;
};

root.render(App);
