import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>404 Not Found</h1>
      <button onClick={() => navigate('/')}>메인화면</button>
    </>
  );
};

export default NotFound;
