import axios from 'axios';
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';

function Search() {
  const [name, setName] = useState('');
  const [lists, setLists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState([]);
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const [test, setTest] = useState(1);

  useEffect(() => {
    const userData = async () => {
      await axios.get('http://localhost:8000/user/search').then(res => {
        setLists(res.data.data);
        setCurrentPosts(res.data.data.slice(indexOfFirstPost, indexOfLastPost));
        setCurrentPage(1);
      });
      console.log(lists);
    };
    userData();
  }, [test]);
  const config = {
    headers: {
      Authorization:
        `Bearer ` +
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJoaWZpIiwiaWF0IjoxNjYxNDQ5NDM0LCJzdWIiOiI1Iiwicm9sZSI6IlJPTEVfVVNFUiIsImV4cCI6MTY2MTQ1MTIzNH0.vIZnIi_msevCE5QgfuyLNN0iPD1aAABU7-rv5wZYrjrj7Yxf0r9J7bLUNLzJUA2nyQk8DIucNRfiIMjFhZj9pQ',
    },
  };
  const submitHandler = e => {
    e.preventDefault();
    setTest(test + 1);
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

      <div className="w-full">
        <table className="min-w-full">
          <thead>
            <tr>
              <th>번호</th>
              <th>이미지</th>
              <th>이름</th>
              <th>팔로우</th>
            </tr>
          </thead>

          {currentPosts.map((val, index) => {
            return (
              <tbody key={val.id}>
                <tr>
                  <td>{(currentPage - 1) * postsPerPage + index + 1}</td>
                  <td>{val.image}</td>
                  <td>{val.name}</td>
                  <td>
                    <button>팔로우</button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}
export default Search;
