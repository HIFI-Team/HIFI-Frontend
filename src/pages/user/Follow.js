import axios from 'axios';
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';

function Follow() {
  const [name, setName] = useState('');

  const config = {
    headers: {
      Authorization:
        `Bearer ` +
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJoaWZpIiwiaWF0IjoxNjYxNDQ5NDM0LCJzdWIiOiI1Iiwicm9sZSI6IlJPTEVfVVNFUiIsImV4cCI6MTY2MTQ1MTIzNH0.vIZnIi_msevCE5QgfuyLNN0iPD1aAABU7-rv5wZYrjrj7Yxf0r9J7bLUNLzJUA2nyQk8DIucNRfiIMjFhZj9pQ',
    },
  };
  const submitHandler = e => {
    e.preventDefault();
    try {
      const request = axios.post(
        'http://localhost:8000/user/search',
        { name: name },
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
  return (
    <div>
      <NavBar />
      <h1>검색하기</h1>
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
        <button onClick={submitHandler}>검색</button>
      </form>
    </div>
  );
}
export default Follow;
