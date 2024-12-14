

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Overview from './pages/Overview';
import './App.css';
import GameDetails from './pages/GameDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/details/:game" element={<GameDetails/>} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
