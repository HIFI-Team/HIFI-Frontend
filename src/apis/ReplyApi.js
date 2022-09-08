import axios from 'axios';
const ReplyApi = {
  requestSaveReply: async body => {
    const response = await axios.post(
      'http://localhost:8000/comment/new',
      body
    );
    return response;
  },
};
export default ReplyApi;
