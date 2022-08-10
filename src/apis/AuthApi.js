import axios from 'axios';

const AuthApi = {
  requestJoin: async body => {
    const data = await axios.post('https://api.hifihifi.site/auth/join', body);

    console.log(data);
    return data;
  },
  requestLogin: async body => {
    const data = await axios.post('https://api.hifihifi.site/auth/login', body);

    console.log(data);
    return data;
  },
};

export default AuthApi;
