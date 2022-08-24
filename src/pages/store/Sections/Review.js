import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
import ReviewApi from '../../../apis/ReviewApi';

export const Review = props => {
  // const user = useSelector(state => state.user);
  const storeId = props.postId;
  const [reviewValue, setReviewValue] = useState('');

  const handleClick = event => {
    setReviewValue(event.currentTarget.value);
  };

  const onSubmit = event => {
    //리다이렉트 안되도록
    event.preventDefault();

    const variable = {
      content: reviewValue,
      // writer: user.userData._id,
      postId: storeId,
    };

    const saveReview = async () => {
      console.log('try save');
      const response = await ReviewApi.requestSaveReview();
      if (response.data.success) {
        setReviewValue('');
        props.refreshFunction(response.data.result);
      } else {
        alert('코멘트를 저장하지 못했습니다.');
      }
    };
    saveReview();
  };

  return (
    <div>
      <br />
      <p>Reviews</p>
      <hr />
      {/* Comment Lists */}

      {/* Root Comment Form */}
      <form style={{ display: 'flex' }} onSubmit={onSubmit}>
        <textarea
          style={{ width: '100%', borderRadius: '10px', resize: 'none' }}
          onChange={handleClick}
          value={reviewValue}
          placeholder="리뷰를 작성해 주세요."
        />
        <br />
        <br />
        <button
          style={{ width: '10%', height: '52px', borderRadius: '10px', marginLeft: '10px' }}
          onClick={onSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
