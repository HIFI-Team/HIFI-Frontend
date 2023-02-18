import axios from 'axios';
const FollowApi = {
  requestFollow: async (fromEmail, toEmail) => {
    const response = await axios.post('http://localhost:8000/user/follow', {
      fromEmail: fromEmail,
      toEmail: toEmail,
    });
    return response;
  },
  requestUnFollow: async (fromEmail, toEmail) => {
    const response = await axios.post('http://localhost:8000/user/unfollow', {
      fromEmail: fromEmail,
      toEmail: toEmail,
    });
    return response;
  },
};
export default FollowApi;
