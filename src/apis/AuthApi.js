import axios from 'axios';

const AuthApi = {
  requestJoin: async body => {
    const data = await axios.post('http://localhost:8000/auth/join', body);
    return data;
  },
  requestLogin: async body => {
    const data = await axios.post('http://localhost:8000/auth/login', body);
    return data;
  },
  requestKakaoLogin: async body => {
    const data = await axios.post(
      'http://localhost:8000/auth/login/kakao',
      body,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return data;
  },
};

export default AuthApi;
