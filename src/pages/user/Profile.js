import axios from 'axios';
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import ProfileDto from '../../components/ProfileDto';
import { useCookies } from 'react-cookie';
import ProfileApi from '../../apis/ProfileApi';

function Profile() {
  let [profile, setProfile] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [anonymous, setAnonymous] = useState('');
  const [cookies] = useCookies(['accessToken']);

  const profileTest = ['name', 'description', 'image', 'anonymous'];
  const config = {
    headers: {
      Authorization:
        `Bearer ` +
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJoaWZpIiwiaWF0IjoxNjYyNjI3NTUzLCJzdWIiOiJtaW5zZW9rQG5hdmVyLmNvbSIsInJvbGUiOiJbUk9MRV9VU0VSXSIsImV4cCI6MTY2MjYyOTM1M30.5Qd1_6BZAw9m4m7Bt8GZnFRQOIInJFEvyx37GGNhj9sZny1fgGKjHFLRipHtUADIS2YnaSSGDI4Kj-OdgYWuzw',
    },
  };
  const refresh = async () => {
    try {
      // setCookies(useCookies(['accessToken']));
      const response = await ProfileApi.requestProfile(cookies.accessToken);
      setEmail(response.data.data.email);
      setName(response.data.data.name);
      setDescription(response.data.data.description);
      setImage(response.data.data.image);
      if (response.data.data.anonymous) setAnonymous('예');
      else setAnonymous('아니오');
    } catch (e) {
      console.log(e, 'A');
    }
  };
  const submitHandler = async () => {
    const profileDto = { email, name, description, image, anonymous };
    try {
      // setCookies(useCookies(['accessToken']));

      // const request = await axios.post(
      //   'http://localhost:8000/user/update',
      //   {
      //     name: profileDto.name,
      //     description: profileDto.description,
      //     image: profileDto.image,
      //     anonymous: profileDto.anonymous,
      //   },
      //   config
      // );

      console.log(profileDto);
      const request = await ProfileApi.requestUpdate(profileDto);
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
      <h1>{name}님의 프로필</h1>
      <h3>프로필 사진</h3>
      {image}
      <h3>소개</h3>
      {description}
      <h3>비공개 여부</h3>
      {anonymous}
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
