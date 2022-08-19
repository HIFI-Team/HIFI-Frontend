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
		getData();
	}, []);
	useEffect(() => {
		mapScript(mapData);
	}, [mapData]);

	const getData = () => {
		const promise = StoreApi.requestMap();
		promise.then(appData => {
			setMapData(appData);
		});
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
