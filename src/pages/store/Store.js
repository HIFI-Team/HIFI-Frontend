import React, { useState, useEffect } from 'react';
import StoreApi from '../../apis/StoreApi';
import mapScript from './mapScript';
import StoreDto from '../../dtos/StoreDto';

const Store = () => {
	const [mapData, setMapData] = useState([StoreDto.storeResponseDto()]);
	useEffect(() => {
		setData();
	}, []);
	const setData = async () => {
		const data = await StoreApi.requestMap();
		setMapData(data);
		mapScript(data);
	};
	console.log(mapData);
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
