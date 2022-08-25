import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
import ReviewApi from '../../../apis/ReviewApi';
import SingleReview from './SingleReview';
import { useCookies } from 'react-cookie';
// import Login from '../../auth/Login';

export const Review = props => {
	// const user = useSelector(state => state.user);
	const storeId = props.postId;
	const [reviewValue, setReviewValue] = useState('');
	// const [cookies] = useCookies([Login.accessToken]);

	// console.log(user);

	const handleClick = event => {
		setReviewValue(event.currentTarget.value);
	};

	const onSubmit = event => {
		//리다이렉트 안되도록
		event.preventDefault();

		const variable = {
			content: reviewValue,
			// user: useCookies,
			postId: storeId,
		};

		console.log(variable);

		const saveReview = async variable => {
			console.log('try save');
			const response = await ReviewApi.requestSaveReview(variable);
			if (response.data.success) {
				setReviewValue('');
				props.refreshFunction(response.data.result);
			} else {
				alert('리뷰를 저장하지 못했습니다.');
			}
		};
		saveReview();
	};

	console.log(props.ReviewLists);

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
			{/* review Lists */}
			{console.log(props.ReviewLists)}
			{props.ReviewLists &&
				props.ReviewLists.map(
					(review, index) =>
						!review.responseTo && (
							<React.Fragment>
								<SingleReview
									refreshFunction={props.refreshFunction}
									review={review}
									postId={storeId}
								/>
							</React.Fragment>
						),
				)}
		</div>
	);
};
