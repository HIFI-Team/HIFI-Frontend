import { useEffect, useRef, useState } from 'react';
import NavBar from '../../components/NavBar';
import ProfileDto from '../../components/ProfileDto';
import { useCookies } from 'react-cookie';
import ProfileApi from '../../apis/ProfileApi';
import { Avatar } from 'antd';

function Profile() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  // 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  // );
  const [anonymous, setAnonymous] = useState('');
  const [cookies] = useCookies(['accessToken']);
  const fileInput = useRef(null);

  const refresh = async () => {
    try {
      const response = await ProfileApi.requestProfile(cookies.accessToken);
      setEmail(response.data.data.email);
      setName(response.data.data.name);
      setDescription(response.data.data.description);
      if (response.data.data.image) setImage(response.data.data.image);
      console.log(response.data.data);
      if (response.data.data.anonymous) setAnonymous('예');
      else setAnonymous('아니오');
    } catch (e) {
      console.log(e, 'A');
    }
  };
  const submitHandler = async () => {
    const profileDto = { email, name, description, image, anonymous };
    try {
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
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = () => {
      if (reader.readyState === 2) setImage(reader.result);
      console.log(image);
    };
    reader.readAsDataURL(file);
    console.log('image ' + image);
    console.log('fileInput ' + fileInput);
    // setImage(e.target.value);
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
      {/*<h3>프로필 사진</h3>*/}
      <div>
        {image && (
          <img
            alt="sample"
            src={image}
            width={200}
            height={200}
            style={{ margin: '10px', borderRadius: 110 }}
            onClick={() => console.log(image)}
          />
        )}
        {image}
      </div>
      {/*<div>*/}
      {/*  <Avatar>*/}
      {/*    src={image}*/}
      {/*    style={{ margin: '20px' }}*/}
      {/*    size={200}*/}
      {/*  </Avatar>*/}
      {/*</div>*/}
      <div>
        <h3>소개</h3>
        {description}
      </div>
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
        {/*<button onClick={imageHandler}>업로드</button>*/}
        <input
          type="file"
          // style={{ display: 'none' }}
          accept="image/jpg,image/png,image/jpeg"
          name="profile_img"
          onChange={imageHandler}
          ref={fileInput}
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
