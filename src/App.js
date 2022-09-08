import './App.css';
import React, { Component } from 'react';
import { Navigate, Route, Routes, Switch } from 'react-router-dom';
import Home from './pages/common/Home';
import NotFound from './pages/common/NotFound';
import Join from './pages/auth/Join';
import Login from './pages/auth/Login';
import KakaoLogin from './pages/auth/KakaoLogin';
import KakaoSuccess from './pages/auth/KakaoSuccess';
import Profile from './pages/user/Profile';
import Search from './pages/user/Search';
import Maps from './pages/store/Maps';
import StoreDetail from './pages/store/StoreDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/join" element={<Join />} />
      <Route path="/login/kakao" element={<KakaoLogin />} />
      <Route path="/auth/login/kakao" element={<KakaoSuccess />} />
      <Route path="/login" element={<Login />} />
      <Route path="/store" element={<Maps />} />
      <Route exact path="/store/:storeId" element={<StoreDetail />} />
      <Route path="/follow" element={<Search />} />

      <Route path="/error" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/error" />} />
    </Routes>
  );
}

export default App;
