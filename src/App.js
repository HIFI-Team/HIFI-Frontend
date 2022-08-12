import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/common/Home';
import NotFound from './pages/common/NotFound';
import Join from './pages/auth/Join';
import Login from './pages/auth/Login';
import Profile from './pages/user/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/join" element={<Join />} />
      <Route path="/login" element={<Login />} />

      <Route path="/error" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/error" />} />
    </Routes>
  );
}

export default App;
