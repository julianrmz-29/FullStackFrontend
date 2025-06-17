import React from 'react';
import logo from '../../logo.svg';
import './Home.css';

export default function Home() {
  return (
    <div className='AppHome'>
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Welcome to the Todo App</h1>
            <p>Select a menu option to navigate through the app.</p>
        </header>      
    </div>
  );
}
