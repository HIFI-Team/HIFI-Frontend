import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate('/login')}>로그인</button>
      <button onClick={() => navigate('/join')}>회원가입</button>
      <button onClick={() => navigate('/user')}>내 정보</button>
    </>
  );
};

export default Home;
