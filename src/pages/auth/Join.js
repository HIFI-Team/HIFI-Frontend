import NavBar from '../../components/NavBar';
import AuthApi from '../../apis/AuthApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';

const Join = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const emailHandler = e => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const passwordHandler = e => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();
    const body = { email, password };
    AuthApi.requestJoin(body).then(res => {
      if (res.status === 200) navigate('/');
    });
  };

  return (
    <>
      <NavBar />
      <h1>회원가입 페이지 입니다</h1>
      <form onSubmit={submitHandler}>
        <label for="email">아이디</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={emailHandler}
          placeholder="이메일"
        />
        <br />
        <label for="password">패스워드</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={passwordHandler}
          placeholder="비밀번호"
        />
        <br />
        <button type="submit">가입</button>
      </form>
    </>
  );
};

export default Join;
