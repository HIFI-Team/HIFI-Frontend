import axios from 'axios';
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import ProfileDto from '../../components/ProfileDto';

function Profile() {
  const [profile, setProfile] = useState(null);
  const config = {
    headers: {
      Authorization:
        `Bearer ` +
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJoaWZpIiwiaWF0IjoxNjYwMzEwNDEyLCJzdWIiOiIxIiwicm9sZSI6IlJPTEVfVVNFUiIsImV4cCI6MTY2MDMxMjIxMn0.BcIWk1WQndFKvvtykzS-Zv6uEVnJCqtuqPC8RaO1F3q1ovZdENq9srWTm1gxjc2_QCLWyAOgg6WVCyIDdiXjlw',
    },
  };
  const onClick = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/user/profile',
        config
      );
      setProfile(response.data.response);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <NavBar />
      <h1>회원님의 프로필</h1>
      <button onClick={onClick}>테스트</button>
      {profile && (
        <textarea
          rows={7}
          value={JSON.stringify(profile, null, 2)}
          readOnly={true}
        />
      )}
    </div>
  );
}
// const Profile = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const config = {
//     headers: {
//       Authorization:
//         `Bearer ` +
//         'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJoaWZpIiwiaWF0IjoxNjYwMzEwNDEyLCJzdWIiOiIxIiwicm9sZSI6IlJPTEVfVVNFUiIsImV4cCI6MTY2MDMxMjIxMn0.BcIWk1WQndFKvvtykzS-Zv6uEVnJCqtuqPC8RaO1F3q1ovZdENq9srWTm1gxjc2_QCLWyAOgg6WVCyIDdiXjlw',
//     },
//   };
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//
//       try {
//         const response = await axios.get(
//           'http://localhost:8000/user/profile',
//           config
//         );
//         setProfile(response.data.response);
//       } catch (e) {
//         console.log(e);
//       }
//       setLoading(false);
//     };
//
//     fetchData();
//   }, []);
//
//   if (loading) {
//     return <ProfileDto>로딩중</ProfileDto>;
//   }
//   if (!profile) {
//     return null;
//   }
//   return <ProfileDto>{profile}</ProfileDto>;
// };
export default Profile;
