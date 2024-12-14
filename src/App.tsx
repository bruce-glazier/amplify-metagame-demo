

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Overview from './pages/Overview';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Overview />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
