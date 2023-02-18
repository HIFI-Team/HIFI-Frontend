import axios from 'axios';
const ReviewApi = {
  requestAllReview: async id => {},
  requestReview: async (id, accessToken) => {
    const response = await axios.get('http://localhost:8000/review/' + id, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  },
  requestSaveReview: async body => {
    const response = await axios.post('http://localhost:8000/review/new', body);
    return response;
  },
};
export default ReviewApi;
