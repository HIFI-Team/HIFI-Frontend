import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FiMinus, FiPlus } from 'react-icons/fi';
const { kakao } = window;

const Map = props => {
	const storeInfo = props.storeInfo;

	const mapContainer = useRef(null);
	const [map, setMap] = useState();
	const [position, setPosition] = useState();

	const geocoder = new kakao.maps.services.Geocoder();
	const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

	const mapOptions = {
		center: '', // 지도의 중심좌표
		level: 1, // 지도의 확대 레벨
	};

	const marker = new kakao.maps.Marker({
		map: map,
		position: position,
	});

	useEffect(() => {
		console.log(storeInfo);
		if (storeInfo) {
			geocoder.addressSearch(storeInfo.address_name, function (result, status) {
				if (status === kakao.maps.services.Status.OK) {
					let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
					setPosition(coords);
				}
			});
		}
	}, [storeInfo]);

	mapOptions.center = position;

	useEffect(() => {
		if (position) {
			setMap(new kakao.maps.Map(mapContainer.current, mapOptions));
			marker.map = map;
			marker.position = position;
			marker.setMap(map);
		}
	}, [position]);

	const zoomIn = function () {
		map.setLevel(map.getLevel() - 1);
	};
	const zoomOut = function () {
		map.setLevel(map.getLevel() + 1);
	};
	return (
		<React.Fragment>
			<MapContainer id="map" ref={mapContainer}>
				<MapBtnContainer>
					<MapControlBtn onClick={zoomIn} style={{ borderRight: '1px solid #919191' }}>
						<FiPlus />
					</MapControlBtn>
					<MapControlBtn onClick={zoomOut}>
						<FiMinus />
					</MapControlBtn>
				</MapBtnContainer>
			</MapContainer>
		</React.Fragment>
	);
};
export default Map;

/** styled component */
const Container = styled.div`
	position: relative;
	margin: 3rem auto;
	margin-bottom: 60px;
	width: 85%;
	height: 60vh;
`;
const MapContainer = styled.div`
	position: relative;
	margin: 3rem auto;
	margin-bottom: 60px;
	width: 85%;
	height: 60vh;
`;
const MapBtnContainer = styled.div`
	position: absolute;
	top: 15px;
	right: 10px;
	z-index: 5;
	border-radius: 5px;
	display: flex;
	align-items: center;
	border: 1px solid #919191;
	background-color: #f5f5f5;
`;
const MapControlBtn = styled.div`
	width: 40px;
	height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	cursor: pointer;
`;
