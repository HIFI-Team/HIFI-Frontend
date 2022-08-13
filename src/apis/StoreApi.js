import axios from 'axios';
const StoreApi = {
  requestMap: async body => {
    const data = await axios.get('https://api.hifihifi.site/store', body);

    console.log(data);
    return data;
  },
};
export default StoreApi;
