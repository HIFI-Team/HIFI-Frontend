import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
// import styled from 'styled-components';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <h1>놀랍게도 메인화면 입니다</h1>
      <button onClick={() => navigate('/login')}>로그인</button>
      <button onClick={() => navigate('/join')}>회원가입</button>
      <button onClick={() => navigate('/profile')}>내 정보</button>
      <button onClick={() => navigate('/follow')}>팔로우 테스트</button>
      <button onClick={() => navigate('/user')}>내 정보</button>
      <button onClick={() => navigate('/store')}>지도</button>
      <button onClick={() => navigate('/login/kakao')}>카카오 로그인</button>
    </>
  );
};

export default Home;
