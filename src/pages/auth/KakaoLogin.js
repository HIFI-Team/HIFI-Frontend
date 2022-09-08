import NavBar from '../../components/NavBar';
import AuthApi from '../../apis/AuthApi';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// import styled from 'styled-components';

const KakaoLogin = () => {
  const location = useLocation();

  const KAKAO_BASEURL = process.env.REACT_APP_KAKAO_BASEURL;
  const KAKAO_RESTAPI_KEY = process.env.REACT_APP_KAKAO_RESTAPI_KEY;
  const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  const loginUri =
    'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=' +
    KAKAO_RESTAPI_KEY +
    '&redirect_uri=' +
    KAKAO_BASEURL +
    KAKAO_REDIRECT_URI;

  const popupKakaoLogin = () => {
    window.open(
      loginUri,
      'popupKakaoLogin',
      'width=700, height=500, scrollbars=0, toolbar=0, menubar=no'
    );
  };

  return (
    <>
      <NavBar />
      <h1>카카오 로그인</h1>
      <a href={loginUri}>카카오 로그인</a>
    </>
  );
};

export default KakaoLogin;
