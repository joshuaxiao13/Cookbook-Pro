import React, { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import MyNavbar from './Navbar';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Browse from './Browse';
import Cookbook from './Cookbook';
import RecipePage from './RecipePage';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <>
      <HashRouter>
        <MyNavbar user={user} logout={setUser} />
        <div style={{ height: '58px' }} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/login'
            element={<Login user={user} login={setUser} />}
          />
          <Route path='/browse' element={<Browse />} />
          <Route
            path='/browse/:id'
            element={<RecipePage user={{ username: 'public' }} />}
          />
          <Route path='/signup' element={<Signup login={setUser} />} />
          {user && (
            <>
              <Route path='/mycookbook' element={<Cookbook user={user} />} />
              <Route
                path='/mycookbook/:id'
                element={<RecipePage user={user} />}
              />
            </>
          )}
          <Route
            path='*'
            element={
              <div
                style={{
                  marginTop: '20%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <h1>Page Not Found 🍝</h1>
              </div>
            }
          />
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;
