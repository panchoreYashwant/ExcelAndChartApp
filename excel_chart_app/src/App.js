import logo from './logo.svg';
import './App.css';
import React from 'react';
import Chart from './components/Chart';
import FilterChart from './components/FilterChart';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chart />} />
        <Route path="/filter" element={<FilterChart />} />


      </Routes>
    </BrowserRouter>

  </React.Fragment>
  );
}

export default App;
