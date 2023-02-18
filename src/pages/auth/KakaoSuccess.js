import NavBar from '../../components/NavBar';
import AuthApi from '../../apis/AuthApi';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

// import styled from 'styled-components';

const KakaoSuccess = () => {
  const params = new URL(document.location).searchParams;
  const code = params.get('code'); //쿼리파라미터 code 가져오기
  const setAccessToken = useCookies(['accessToken'])[1];

  useEffect(() => {
    async function dispatchLogin() {
      try {
        AuthApi.requestKakaoLogin(code).then(res => {
          if (res.status === 200) {
            const date = new Date();
            const { accessToken } = res.data.data;
            setAccessToken('accessToken', accessToken, {
              expires: new Date(date.setDate(date.getDate() + 3)),
              path: '/',
              secure: true,
            });
            console.log(res.data.data);
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
    dispatchLogin();
  }, []);

  return (
    <>
      <NavBar />
      <h1>로그인 처리중입니다</h1>
    </>
  );
};

export default KakaoSuccess;
