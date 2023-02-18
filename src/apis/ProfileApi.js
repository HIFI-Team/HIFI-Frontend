import axios from 'axios';
const ProfileApi = {
  requestProfile: async accessToken => {
    const response = await axios.get('http://localhost:8000/user/profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  },
  requestUpdate: async profileDto => {
    const request = await axios.post('http://localhost:8000/user/update', {
      email: profileDto.email,
      name: profileDto.name,
      description: profileDto.description,
      image: profileDto.image,
      anonymous: profileDto.anonymous,
    });
    return request;
  },
};
export default ProfileApi;
