import { storeData } from '../../dtos/StoreDto';
const { kakao } = window;
const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

const displayMarker = function (map, coords, el) {
  const marker = new kakao.maps.Marker({
    map: map,
    position: coords,
  });
  kakao.maps.event.addListener(marker, 'mouseover', function () {
    // 마커를 마우스오버 이벤트가 발생하면 장소명이 인포윈도우에 표출됩니다.
    const test = 'test';
    infowindow.setContent('<div style="padding:5px;font-size:12px;">', `${test}`, '</div>');
    infowindow.open(map, marker);
  });
  kakao.maps.event.addListener(marker, 'mouseout', function () {
    // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
    infowindow.close();
  });
  kakao.maps.event.addListener(marker, 'click', function () {
    const roadFind = 'https://map.kakao.com/link/to/';
    window.open(roadFind);
  });
};
const mapScript = () => {
  console.log(kakao);
  const container = document.getElementById('map');
  const options = {
    center: new kakao.maps.LatLng(37.5515814, 126.9249751),
    level: 3,
  };
  const map = new kakao.maps.Map(container, options);
  const geocoder = new kakao.maps.services.Geocoder();
  storeData.array.forEach(el => {
    geocoder.addressSearch(el, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        displayMarker(map, coords, el);
      }
    });
  });
};
export default mapScript;
