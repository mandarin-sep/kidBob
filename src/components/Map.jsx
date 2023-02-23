import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NaverMap, useNavermaps, Marker, InfoWindow } from "react-naver-maps";
import { MapSlice } from "../store/MapSlice";

const Map = () => {
  //네이버 지도 api 호출
  const navermaps = useNavermaps();

  const [location, setLocation] = useState([]);
  const dispatch = useDispatch();
  const pickedShopLocation = useSelector((state) => state.loca.location);
  const shopInfo = useSelector((state) => state.daegu.value);
  const info = useSelector((state) => state.loca.value);
  const isOpen = useSelector((state) => state.loca.boolean);
  const type = useSelector((state) => state.loca.type);

  //naverMap의 map과 infowindow에 useRef말고 useState로 접근
  const [map, setMap] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);

  //마커를 렌더링해줄 정보를 location 변수에 담아줌
  useEffect(() => {
    setLocation(shopInfo);
  }, [shopInfo]);

  //지도의 중심이 바뀌면 지도의 줌정도을 바꿈
  useEffect(() => {
    if (map) {
      isOpen ? map.setZoom(18, true) : map.setZoom(14, true);
    }

    if (infoWindow) {
      infoWindow.close();
    }
  }, [pickedShopLocation]);

  //가게 종류별로 필터링
  useEffect(() => {
    if (type !== "") {
      setLocation(shopInfo.filter((shop) => shop.shopBsType === type));
    }
  }, [type]);

  //infoWindow 설정
  if (infoWindow && isOpen) {
    infoWindow.setContent(
      `<div style="padding:15px; font-size:14px; width: 226px; height: 146px; box-sizing: border-box;">
        <h4 style="margin-top:0px; margin-bottom:10px;">` +
        info.shopName +
        `</h4>
        <span>가게주소:` +
        info.shopAddr +
        `</span>
      <br />
      <span>도로명주소:` +
        info.shopRoadAddr +
        `</span>
      <br />
      <span>가게 전화:` +
        info.shopTel +
        ` </span></div>`
    );
    const infoState = pickedShopLocation.destinationPoint(0, 15);
    if (isOpen) {
      infoWindow.open(map, infoState);
    }
  }

  const markerClick = () => {
    dispatch(MapSlice.actions.isOpen(!isOpen));

    infoWindow.close();
  };

  //마커 정보가 들어오지 않았을때 표시해줄 화면 => intro 페이지 제작후 삭제
  if (location.length === 0) {
    return <NaverMap></NaverMap>;
  }

  return (
    <NaverMap
      center={pickedShopLocation}
      defaultZoom={16}
      ref={setMap}
      scrollWheel={true}
    >
      {location.map((stat) => {
        return (
          <Marker
            position={new navermaps.LatLng(stat.shopLat, stat.shopLon)}
            title={stat.shopName}
            clickable={true}
            onClick={markerClick}
          />
        );
      })}
      ;
      <InfoWindow ref={setInfoWindow} />
    </NaverMap>
  );
};

export default Map;
