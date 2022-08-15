import axios from 'axios';
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import ProfileDto from '../../components/ProfileDto';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [anonymous, setAnonymous] = useState('');

  const config = {
    headers: {
      Authorization:
        `Bearer ` +
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJoaWZpIiwiaWF0IjoxNjYwNTc3MjY5LCJzdWIiOiIxIiwicm9sZSI6IlJPTEVfVVNFUiIsImV4cCI6MTY2MDU3OTA2OX0._bAy1JE2fUybV2R8mn4fdS_dWiSbHPomtWodgk_AH47HQX0FuTWlcJnhDPT6KRkF6uz9O7oRqXsggjUOU4zQug',
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
  const nameHandler = e => {
    e.preventDefault();
    setProfile(e.target.value);
  };
  const descriptionHandler = e => {
    e.preventDefault();
    setDescription(e.target.value);
  };
  const imageHandler = e => {
    e.preventDefault();
    setImage(e.target.value);
  };
  const anonymousHandler = e => {
    e.preventDefault();
    setAnonymous(e.target.value);
  };
  const submitHandler = e => {
    e.preventDefault();
    const profileDto = { name, description, image, anonymous };
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
      <form onSubmit={submitHandler}>
        <label for="name">이름</label>
        <input
          id="name"
          type="name"
          value={name}
          onChange={nameHandler}
          placeholder="이름"
        />
        <br />
        <label for="description">소개</label>
        <input
          id="description"
          type="description"
          value={description}
          onChange={descriptionHandler}
          placeholder="소개"
        />
        <br />
        <label for="image">프로필 사진</label>
        <input
          id="image"
          type="link"
          value={image}
          onChange={imageHandler}
          placeholder="이미지"
        />
        <br />
        <label for="anonymous">비공개 여부</label>
        <input
          id="anonymous"
          type="anonymous"
          value={anonymous}
          onChange={anonymousHandler}
          placeholder="비공개 여부"
        />
        <br />
        <button type="submit">프로필 변경</button>
      </form>
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
