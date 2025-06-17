import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoView from './components/Todo/TodoView';
import Home from './components/Home/Home';
import './AppRouter.css'

export default function AppRouter() {
  return (
    <Router>
      <nav className='Navbar'>
        <button className='LinkBtn'><a href="/" className='ALink'>Home</a></button>
        <button className='LinkBtn'><a href="/todo" className='ALink'>Task To Do</a></button>        
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<TodoView />} />
      </Routes>
    </Router>
  );
}
