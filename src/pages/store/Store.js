import React, { useState, useEffect } from 'react';
import StoreApi from '../../apis/StoreApi';
import mapScript from './mapScript';

const Store = () => {
	const [mapData, setMapData] = useState([
		{
			address_name: '',
			categoryCode: '',
			description: null,
			grade: 0,
			images: null,
			name: '',
			uid: '',
		},
	]);
	useEffect(() => {
		setData();
	}, []);
	const setData = async () => {
		const data = await StoreApi.requestMap();
		setMapData(data);
		mapScript(data);
	};
	return (
		<div
			id="map"
			style={{
				width: '100%',
				height: '60vh',
			}}
		/>
	);
};

export default Store;
