import React, { useEffect } from 'react';
import mapLoad from './mapScript';

const Store = () => {
  useEffect(() => {
    mapLoad();
  }, []);

  return (
    <div
      id="map"
      style={{
        width: '100%',
        height: '60vh',
      }}
    ></div>
  );
};

export default Store;
