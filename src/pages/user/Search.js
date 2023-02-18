import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import SearchApi from '../../apis/SearchApi';
import FollowApi from '../../apis/FollowApi';
import { useCookies } from 'react-cookie';
import ProfileApi from '../../apis/ProfileApi';

function Search() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cookies] = useCookies(['accessToken']);
  const [lists, setLists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState([]);
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const [refresh, setRefresh] = useState(1);

  useEffect(() => {
    const userData = async () => {
      const response = await SearchApi.requestAllUser(cookies.accessToken);
      setLists(response.data.data);

      const myEmail = await ProfileApi.requestProfile(cookies.accessToken);
      setEmail(myEmail.data.data.email);

      setCurrentPosts(
        response.data.data.slice(indexOfFirstPost, indexOfLastPost)
      );
      setCurrentPage(1);
    };
    userData();
  }, [refresh]);
  const submitHandler = e => {
    e.preventDefault();
    setRefresh(refresh + 1);
  };
  const nameHandler = e => {
    e.preventDefault();
    setName(e.target.value);
  };
  const clickFollow = async (toEmail, e) => {
    e.preventDefault();
    const response = await FollowApi.requestFollow(email, toEmail);
    setRefresh(refresh + 1);
  };
  const clickUnFollow = async (toEmail, e) => {
    e.preventDefault();
    console.log(email, toEmail);
    const response = await FollowApi.requestUnFollow(email, toEmail);
    setRefresh(refresh + 1);
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
                  <td>
                    {val.image && (
                      <img
                        alt="sample"
                        src={val.image}
                        height={60}
                        width={60}
                        style={{ margin: '5px', borderRadius: 40 }}
                      />
                    )}
                  </td>
                  <td>{val.name}</td>
                  <td>
                    {val.followed === true ? (
                      <button
                        onClick={e => {
                          clickUnFollow(val.email, e);
                        }}
                      >
                        언팔로우
                      </button>
                    ) : (
                      <button
                        onClick={e => {
                          clickFollow(val.email, e);
                        }}
                      >
                        팔로우
                      </button>
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
