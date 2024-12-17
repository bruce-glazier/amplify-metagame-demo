import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Overview from './pages/Overview';
import GameDetails from './pages/GameDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/details/:slugId" element={<GameDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
