import NavBar from '../../components/NavBar';
import { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import ReviewApi from '../../apis/ReviewApi';

function Pheed() {
  const [cookies] = useCookies(['accessToken']);

  const getReviewData = async () => {
    const data = await ReviewApi.requestReview(1, cookies.accessToken);
    console.log(data);
  };
  return (
    <div>
      <NavBar />
      <button onClick={getReviewData}>test</button>
    </div>
  );
}

export default Pheed;
