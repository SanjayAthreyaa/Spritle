import logo from './logo.svg';
import './App.css';
import Home from './component/home';
import Login from './component/login';
import Register from './component/register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import Header from './component/header';
import Tconsole from './component/Tconsole';
import Sconsole from './component/Sconsole';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Suspense >
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Header/>
                  <Home/>
                </div>
              }
            />
           
            <Route
              path="signin"
              element={
                <div>
                  <Login />
                </div>
              }
            />
            <Route
              path="register"
              element={
                <div>
                  <Register />
                </div>
              }
            />
            <Route
              path="teacher.console"
              element={
                <div>
        
                  <Tconsole />
                </div>
              }
            />
            <Route
              path="student.console"
              element={
                <div>
                 
                  <Sconsole />
                </div>
              }
            />
           
          
          
            {/* <Route path="*" element={<ErrorPage />} /> */}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
