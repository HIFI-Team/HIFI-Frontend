import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StoreApi from '../../apis/StoreApi';
import Map from './Sections/Map';
import { Reviews } from './Sections/Reviews';
import { useCookies } from 'react-cookie';

import { Typography } from 'antd';

const { Title } = Typography;
const StoreDetail = () => {
  const [cookies] = useCookies(['accessToken']);

  const [_store, set_store] = useState([]);
  const storeId = useParams().storeId;

  useEffect(() => {
    getStoreData();
  }, []);

  const getStoreData = async () => {
    const data = await StoreApi.requestStore(storeId, cookies.accessToken);
    set_store(data);
  };
  console.log(_store);

  return (
    <div>
      <Map storeInfo={_store.store} />
      <div style={{ width: '85%', margin: '3rem auto' }}>
        <Title level={4}> Store info </Title>
        <hr />
        <Reviews
          refreshFunction={getStoreData}
          newReview={_store.newReview}
          ReviewList={_store.reviews}
          postId={storeId}
        />
      </div>
    </div>
  );
};
export default StoreDetail;
