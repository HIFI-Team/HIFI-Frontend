import React, { useState, useEffect } from 'react';
import { Comment, Avatar, Button, Input } from 'antd';
import ReplyApi from '../../../apis/ReplyApi';
import ReviewApi from '../../../apis/ReviewApi';
import { useCookies } from 'react-cookie';
// import LikeDislikes from "./LikeDislikes";

const { TextArea } = Input;
function Reply(props) {
	const [cookies] = useCookies(['accessToken']);

	const [newReply, setNewReply] = useState('');
	const [content, setContent] = useState('');
	const [review, setReview] = useState('');

	useEffect(() => {
		getReviewData();
	}, [props.review.id]);

	const getReviewData = async () => {
		const data = await ReviewApi.requestReview(props.review.id, cookies.accessToken);
		setReview(data);
		setNewReply(data.newComment);
	};

	console.log(review);

	const handleChange = e => {
		setContent(e.currentTarget.value);
	};

	const onSubmit = event => {
		event.preventDefault();

		newReply.content = content;
		console.log(newReply);

		const saveReply = async () => {
			const response = await ReplyApi.requestSaveReply(newReply);
			if (response.status == 200) {
				setContent('');
				console.log(response);
				getReviewData();
			} else {
				alert('댓글을 저장하지 못했습니다.');
			}
		};
		saveReply();
	};

	const actions = [
		// <LikeDislikes
		//   comment
		//   commentId={props.comment._id}
		//   userId={localStorage.getItem("userId")}
		// />,
	];

	return (
		<div>
			<React.Fragment>
				<form style={{ display: 'flex' }} onSubmit={onSubmit}>
					<TextArea
						style={{ width: '80%', borderRadius: '5px', marginRight: '10px', marginLeft: '10px' }}
						onChange={handleChange}
						value={content}
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
				{console.log(review.comment)}
				{review.comment &&
					review.comment.map(
						(reply, index) =>
							!reply.responseTo && (
								<Comment
									style={{ marginLeft: '30px' }}
									key={index}
									author={reply.user.email}
									content={<p>{reply.content}</p>}
								></Comment>
							),
					)}
			</React.Fragment>
		</div>
	);
}

export default Reply;
