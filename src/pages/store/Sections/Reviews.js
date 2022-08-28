import React, { useState, useEffect } from 'react';
import ReviewApi from '../../../apis/ReviewApi';
import ReviewToReply from './ReviewToReply';
import StarRating from './StarRating';
import { useNavigate, useLocation } from 'react-router-dom';

export const Reviews = props => {
  const storeId = props.postId;
  const [content, setContent] = useState('');
  const [newReview, setNewReview] = useState('');
  const [star, setStar] = useState('');

  const navigate = useNavigate();

  const getStarRating = num => {
    setStar(num);
  };

  useEffect(() => {
    setNewReview(props.newReview);
  }, [props.newReview]);

  const handleClick = event => {
    if (newReview) {
      setContent(event.currentTarget.value);
    } else {
      alert('로그인 후 사용가능합니다.');
      navigate('/login', {
        state: {
          from: '/store/' + storeId,
        },
      });
    }
  };

  const onSubmit = event => {
    event.preventDefault();

    if (newReview) newReview.content = content;
    if (star) {
      newReview.grade = star;
    } else {
      alert('별점을 선택해 주세요.');
      return;
    }
    // console.log(newReview.user);

    const saveReview = async () => {
      const response = await ReviewApi.requestSaveReview(newReview);
      if (response && response.status === 200) {
        setContent('');
        console.log(response);
        props.refreshFunction();
      } else {
        alert('리뷰를 저장하지 못했습니다.');
      }
    };
    saveReview();
  };

  return (
    <div>
      <br />
      <p>Reviews</p>
      <hr />
      {/* Root review Form */}
      <StarRating getStarRating={getStarRating} />
      <form style={{ display: 'flex' }} onSubmit={onSubmit}>
        <textarea
          style={{ width: '100%', borderRadius: '10px', resize: 'none' }}
          onChange={handleClick}
          value={content}
          placeholder="리뷰를 작성해 주세요."
        />
        <br />
        <br />
        <button
          style={{
            width: '10%',
            height: '52px',
            borderRadius: '10px',
            marginLeft: '10px',
          }}
          onClick={onSubmit}
        >
          Submit
        </button>
      </form>
      {/* review Lists */}
      {props.ReviewList &&
        props.ReviewList.map(
          (review, index) =>
            !review.responseTo && (
              <ReviewToReply key={index} review={review} postId={storeId} />
            )
        )}
    </div>
  );
};
