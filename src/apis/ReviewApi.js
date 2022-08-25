import axios from 'axios';
const ReviewApi = {
	requestAllReview: async id => {},
	requestReviews: async id => {
		const response = await axios.get('http://localhost:8000/store/' + id);
		return response.data;
	},
	requestSaveReview: async body => {
		const response = await axios.post('http://localhost:8000/review/new', body);
		return response;
	},
};
export default ReviewApi;
