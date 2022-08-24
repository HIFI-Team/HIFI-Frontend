import React, { useState, useEffect, useRef } from 'react';
import StoreApi from '../../apis/StoreApi';
import styled from 'styled-components';
import { FiMinus, FiPlus } from 'react-icons/fi';
const { kakao } = window;
const StoreSub = () => {
	const mapContainer = useRef(null);

	const [mapData, setMapData] = useState([]);
	const [map, setMap] = useState();

	const { kakao } = window;
	const position = new kakao.maps.LatLng(37.5515814, 126.9249751);
	const mapOptions = {
		center: position, // 지도의 중심좌표
		level: 3, // 지도의 확대 레벨
	};

	const geocoder = new kakao.maps.services.Geocoder();
	const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

	const displayMarker = function (map, coords, el) {
		const marker = new kakao.maps.Marker({
			map: map,
			position: coords,
		});
		kakao.maps.event.addListener(marker, 'mouseover', function () {
			console.log(el.name);
			// 마커를 마우스오버 이벤트가 발생하면 장소명이 인포윈도우에 표출됩니다.
			infowindow.setContent(
				'<div style="padding:5px;font-size:12px;text-align:right;">' + el.name + '</div>',
			);
			infowindow.open(map, marker);
		});
		kakao.maps.event.addListener(marker, 'mouseout', function () {
			// 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
			infowindow.close();
		});
		kakao.maps.event.addListener(marker, 'click', function () {
			// const roadFind = 'https://map.kakao.com/link/to/' + el.uid;
			// window.open(roadFind);
			// map.setCenter(coords);
			const storeId = 1;
			window.location.href = `/store/${storeId}`;
		});
	};

	useEffect(() => {
		getData();
		setMap(new kakao.maps.Map(mapContainer.current, mapOptions));
	}, []);

	useEffect(() => {
		mapData.forEach(el => {
			geocoder.addressSearch(el.address_name, function (result, status) {
				console.log(status);
				if (status === kakao.maps.services.Status.OK) {
					let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
					displayMarker(map, coords, el);
				}
			});
		});
	}, [mapData]);

	const getData = async () => {
		const data = await StoreApi.requestMap();
		console.log(data);
		setMapData(data);
	};

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
export default StoreSub;

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
