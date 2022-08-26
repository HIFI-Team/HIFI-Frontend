import React, { useState, useEffect } from 'react';
import { Comment, Avatar } from 'antd';
import ReviewApi from '../../../apis/ReviewApi';
import { useCookies } from 'react-cookie';
import Reply from './Reply';
// import LikeDislikes from "./LikeDislikes";

function ReviewToReply(props) {
	const [OpenReply, setOpenReply] = useState(false);

	const openReply = () => {
		setOpenReply(!OpenReply);
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
				avatar={<Avatar src={props.review.user.image} alt="image" />}
				content={<p>{props.review.content}</p>}
			></Comment>

			{OpenReply && <Reply review={props.review} />}
		</div>
	);
}

export default ReviewToReply;
