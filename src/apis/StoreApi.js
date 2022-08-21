import axios from 'axios';
const StoreApi = {
	requestMap: async () => {
		const response = await axios.get('http://localhost:8000/store');
		return response.data;
	},
};
export default StoreApi;
