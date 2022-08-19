import React, { useState, useEffect } from 'react';
import StoreApi from '../../apis/StoreApi';
import mapScript from './mapScript';
import StoreDto from '../../dtos/StoreDto';
import styled from 'styled-components';
import { FiMinus, FiPlus } from 'react-icons/fi';

const Store = () => {
  const [mapData, setMapData] = useState([StoreDto.storeResponseDto()]);
  const [map, setMap] = useState();
  useEffect(() => {
    setData();
  }, []);
  const setData = async () => {
    const data = await StoreApi.requestMap();
    setMapData(data);
    setMap(mapScript(data));
  };
  console.log(mapData);
  const zoomIn = function () {
    map.setLevel(map.getLevel() - 1);
  };
  const zoomOut = function () {
    map.setLevel(map.getLevel() + 1);
  };
  return (
    <React.Fragment>
      <MapContainer id="map">
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
export default Store;

/** styled component */
const MapContainer = styled.div`
  position: relative;
  margin: auto;
  margin-bottom: 60px;
  width: 100%;
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
