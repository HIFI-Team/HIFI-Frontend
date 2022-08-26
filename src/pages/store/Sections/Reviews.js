import React, { useState, useEffect } from 'react';
import ReviewApi from '../../../apis/ReviewApi';
import ReviewToReply from './ReviewToReply';
import { useCookies } from 'react-cookie';

export const Reviews = props => {
	const storeId = props.postId;
	const [content, setContent] = useState('');
	const [newReview, setNewReview] = useState('');

	useEffect(() => {
		setNewReview(props.newReview);
	}, [props.newReview]);

	const handleClick = event => {
		setContent(event.currentTarget.value);
	};

	const onSubmit = event => {
		//리다이렉트 안되도록
		event.preventDefault();

		newReview.content = content;
		console.log(newReview.user);

		const saveReview = async () => {
			const response = await ReviewApi.requestSaveReview(newReview);
			if (response.status == 200) {
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
					style={{ width: '10%', height: '52px', borderRadius: '10px', marginLeft: '10px' }}
					onClick={onSubmit}
				>
					Submit
				</button>
			</form>
			{/* review Lists */}
			{console.log(props.ReviewLists)}
			{props.ReviewLists &&
				props.ReviewLists.map(
					(review, index) =>
						!review.responseTo && <ReviewToReply key={index} review={review} postId={storeId} />,
				)}
		</div>
	);
};
