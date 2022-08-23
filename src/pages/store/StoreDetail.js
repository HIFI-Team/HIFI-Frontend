import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StoreApi from '../../apis/StoreApi';

const StoreDetail = () => {
	const [_store, set_store] = useState([]);
	const storeId = useParams().storeId;

	useEffect(() => {
		getStoreData(storeId);
	}, []);

	const getStoreData = async storeId => {
		const data = await StoreApi.requestStore(storeId);
		set_store(data);
		console.log(data);
	};

	return <div>StoreDetail</div>;
};
export default StoreDetail;
