import logo from './logo.svg';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './routes/Navbar';
import { ProvideUser } from './ContextApis/ProvideUser';

function App() {
  return (
    <div className="App">
      <ProvideUser>
        <BrowserRouter>
          <Navbar/>
        </BrowserRouter>
      </ProvideUser>
    </div>
  );
}

export default App;
