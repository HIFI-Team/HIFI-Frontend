import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/common/Home';
import NotFound from './pages/common/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<Home />} />

      <Route path="/error" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/error" />} />
    </Routes>
  );
}

export default App;
