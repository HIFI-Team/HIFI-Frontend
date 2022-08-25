import React, { useState } from 'react';
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
// import { useSelector } from 'react-redux';
// import LikeDislikes from "./LikeDislikes";
const { TextArea } = Input;
function SingleComment(props) {
	// const user = useSelector(state => state.user);
	const [ReviewValue, setReviewValue] = useState('');
	const [OpenReply, setOpenReply] = useState(false);

	const handleChange = e => {
		setReviewValue(e.currentTarget.value);
	};

	const openReply = () => {
		setOpenReply(!OpenReply);
	};

	const onSubmit = e => {
		e.preventDefault();

		const variables = {
			// writer: user.userData._id,
			postId: props.postId,
			responseTo: props.review._id,
			content: ReviewValue,
		};

		// Axios.post('/api/review/saveComment', variables).then(response => {
		// 	if (response.data.success) {
		// 		setReviewValue('');
		// 		setOpenReply(!OpenReply);
		// 		props.refreshFunction(response.data.result);
		// 	} else {
		// 		alert('Failed to save Comment');
		// 	}
		// });
	};

	const actions = [
		// <LikeDislikes
		//   comment
		//   commentId={props.comment._id}
		//   userId={localStorage.getItem("userId")}
		// />,
		<span onClick={openReply} key="comment-basic-reply-to">
			Reply{' '}
		</span>,
	];

	return (
		<div>
			<Comment
				actions={actions}
				author={props.review.user.email}
				// avatar={<Avatar src={props.review.writer.image} alt="image" />}
				content={<p>{props.review.content}</p>}
			></Comment>

			{OpenReply && (
				<form style={{ display: 'flex' }} onSubmit={onSubmit}>
					<TextArea
						style={{ width: '80%', borderRadius: '5px', marginRight: '10px' }}
						onChange={handleChange}
						value={ReviewValue}
						placeholder="write some reply"
					/>
					<br />
					<Button
						style={{ width: '10%', height: '52px', borderRadius: '10px', marginLeft: '10px' }}
						onClick={onSubmit}
					>
						Submit
					</Button>
				</form>
			)}
		</div>
	);
}

export default SingleComment;
