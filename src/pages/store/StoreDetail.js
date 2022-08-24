import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StoreApi from '../../apis/StoreApi';
import Map from './Sections/Map';
import { Review } from './Sections/Review';
import { Card, Avatar, Col, Typography, Row, List } from 'antd';

const { Title } = Typography;
const StoreDetail = () => {
	const [_store, set_store] = useState([]);
	const storeId = useParams().storeId;

	useEffect(() => {
		getStoreData(storeId);
	}, []);

	const getStoreData = async storeId => {
		const data = await StoreApi.requestStore(storeId);
		set_store(data);
		// console.log(data);
	};
	// console.log(_store.store);

	return (
		<div>
			<Map storeInfo={_store.store}></Map>
			<div style={{ width: '85%', margin: '3rem auto' }}>
				<Title level={4}> Store info </Title>
				<hr />
				<Review ReviewLists={_store.reviews} postId={storeId} />
			</div>
		</div>
	);
};
export default StoreDetail;
