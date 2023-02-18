import axios from 'axios';
const SearchApi = {
  requestAllUser: async accessToken => {
    const response = await axios.get('http://localhost:8000/user/search', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  },
};
export default SearchApi;
