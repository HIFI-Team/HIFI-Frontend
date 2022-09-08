import axios from 'axios';
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import SearchApi from '../../apis/SearchApi';
import { useCookies } from 'react-cookie';

function Search() {
  const [name, setName] = useState('');
  const [cookies] = useCookies(['accessToken']);
  const [lists, setLists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState([]);
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const [test, setTest] = useState(1);

  useEffect(() => {
    const userData = async () => {
      const response = await SearchApi.requestAllUser(cookies.accessToken);
      setLists(response.data.data);
      setCurrentPosts(
        response.data.data.slice(indexOfFirstPost, indexOfLastPost)
      );
      setCurrentPage(1);
    };
    userData();
  }, [test]);
  const submitHandler = e => {
    e.preventDefault();
    setTest(test + 1);
  };
  const nameHandler = e => {
    e.preventDefault();
    setName(e.target.value);
  };
  const clickFollow = e => {
    e.preventDefault();
    console.log('follow');
  };
  const clickUnFollow = e => {
    e.preventDefault();
    console.log('unfollow');
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
                    {val.followed === true ? (
                      <button onClick={clickUnFollow}>언팔로우</button>
                    ) : (
                      <button onClick={clickFollow}>팔로우</button>
                    )}
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
