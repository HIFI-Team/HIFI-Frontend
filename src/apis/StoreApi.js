import axios from 'axios';
const StoreApi = {
  requestMap: async () => {
    const response = await axios.get('http://localhost:8000/store');
    return response.data;
  },
  requestStore: async (id, accessToken) => {
    const response = await axios.get('http://localhost:8000/store/' + id, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  },
};
export default StoreApi;
