import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StartUp from '../features/StartUp';
import Header from '../components/Header';
import Aside from '../components/Aside';
import Footer from '../components/Footer';
import Home from '../components/Home';
import Students from '../components/Students';
import StudentProfile from '../components/StudentProfile';
import ErrorPage from '../components/ErrorPage';
import './App.css';

function App() {

  //loads initial data
  StartUp();

  return (
    <div className="App, app-container">
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/students' element={<Students />} />
        <Route path='/profiles' element={<StudentProfile />} />
        <Route path='/*' element={<ErrorPage />} />
      </Routes>
      <Aside />
      <Footer />
    </div>
  );
}

export default App;