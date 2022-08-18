import axios from 'axios';
const StoreApi = {
	requestMap: async () => {
		const response = axios.get('http://localhost:8000/store');

		return (await response).data;
	},
};
export default StoreApi;
