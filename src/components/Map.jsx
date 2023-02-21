import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NaverMap, useNavermaps, Marker, InfoWindow } from "react-naver-maps";
import { MapSlice } from "../store/MapSlice";

const Map = () => {
  //네이버 지도 api 호출
  const navermaps = useNavermaps();

  const [location, setLocation] = useState({});
  const dispatch = useDispatch();
  const state = useSelector((state) => state.loca.location);
  const marker = useSelector((state) => state.daegu.value);
  const info = useSelector((state) => state.loca.value);
  const isOpen = useSelector((state) => state.loca.boolean);
  const type = useSelector((state) => state.loca.type);

  //마커를 렌더링해줄 정보를 location 변수에 담아줌
  useEffect(() => {
    setLocation(marker);
  }, [marker]);

  //지도의 중심을 바꿈
  useEffect(() => {
    if (map) {
      map.setCenter(state);
      map.setZoom(18, true);
    }
    if (infoWindow) {
      infoWindow.close();
    }
  }, [state]);

  useEffect(() => {
    if (type !== "") {
      setLocation(marker.filter((shop) => shop.shopBsType === type));
    }
    console.log(location);
  }, [type]);

  //naverMap의 map과 infowindow에 useRef말고 useState로 접근
  const [map, setMap] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);

  //infoWindow 설정
  if (infoWindow && isOpen) {
    infoWindow.setContent(
      `<div style="padding:15px; font-size:16px;">
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
    const infoState = state.destinationPoint(0, 15);
    if (isOpen) {
      infoWindow.open(map, infoState);
    }
  }

  const markerClick = () => {
    dispatch(
      MapSlice.actions.isOpen({
        isOpen: !isOpen,
      })
    );

    infoWindow.close();
  };

  if (JSON.stringify(location) === "{}") {
    return <NaverMap center={state} defaultZoom={15} ref={setMap}></NaverMap>;
  }

  return (
    <NaverMap
      defaultCenter={state}
      defaultZoom={13}
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

//치킨, 한식, 중식 ,분식, 피자, 패스트푸드, 돈까스, 도시락/죽 카페,디저트 편의점(23)
