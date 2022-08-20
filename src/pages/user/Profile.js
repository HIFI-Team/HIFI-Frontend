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

  const profileTest = ['name', 'description', 'image', 'anonymous'];

  const config = {
    headers: {
      Authorization:
        `Bearer ` +
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJoaWZpIiwiaWF0IjoxNjYxMDA0NDg4LCJzdWIiOiI0Iiwicm9sZSI6IlJPTEVfVVNFUiIsImV4cCI6MTY2MTAwNjI4OH0._QcdyRkoGYx8U3SraD41JczIK9VPPZJkKlJVssShNe4rTYDJb4mcCrcMtW2IcgStk1NB54keGjnlRuQC7eyuJA',
    },
  };
  const refresh = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/user/profile',
        config
      );
      setProfile(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const submitHandler = async () => {
    const profileDto = { name, description, image, anonymous };
    try {
      const request = await axios.post(
        'http://localhost:8000/user/update',
        {
          name: profileDto.name,
          description: profileDto.description,
          image: profileDto.image,
          anonymous: profileDto.anonymous,
        },
        config
      );
      console.log(request);
    } catch (e) {
      console.log(e);
    }
  };
  const nameHandler = e => {
    e.preventDefault();
    setName(e.target.value);
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
  useEffect(() => {
    refresh();
  }, []);
  return (
    <div>
      <NavBar />
      <h1>회원님의 프로필</h1>
      {profile && (
        <textarea
          rows={7}
          value={JSON.stringify(profile, profileTest, 2)}
          readOnly={true}
        />
      )}
      <br />
      <br />
      <h1>프로필 변경하기</h1>
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
        <button onClick={submitHandler}>변경</button>
      </form>
    </div>
  );
}
export default Profile;
