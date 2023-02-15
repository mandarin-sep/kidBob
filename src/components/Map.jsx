import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NaverMap, useNavermaps, Marker, InfoWindow } from "react-naver-maps";
import { MapSlice } from "../store/MapSlice";

const Map = () => {
  const [location, setLocation] = useState({});
  const dispatch = useDispatch();
  const state = useSelector((state) => state.loca.location);
  const marker = useSelector((state) => state.daegu.value);
  const info = useSelector((state) => state.loca.value);
  const isOpen = useSelector((state) => state.loca.boolean);

  //마커를 렌더링 시키기 위해서 location(좌표가 들어있는 객체)가 변하면 re-render
  useEffect(() => {
    setLocation(marker);
  }, [location]);

  //지도의 중심을 바꿈
  useEffect(() => {
    if (map) {
      map.setCenter(state);
      map.setZoom(18, true);
    }
  }, [state]);

  useEffect(() => {}, [isOpen]);

  const [map, setMap] = useState(null);

  //마커를 나타낼 좌표계를 가져오는 함수
  const handleClick = (e) => {
    e.preventDefault();
    if (map) {
      map.setCenter(state);
    }
    setLocation(marker);
  };

  const [infoWindow, setInfoWindow] = useState(null);

  if (infoWindow && isOpen) {
    infoWindow.setContent(
      `<div style="padding:20px; ">
        <h4>` +
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
  const navermaps = useNavermaps();
  if (JSON.stringify(location) === "{}") {
    return (
      <NaverMap defaultCenter={state} defaultZoom={15} ref={setMap}>
        <button onClick={handleClick} style={{ position: "absolute" }}>
          클릭!
        </button>
      </NaverMap>
    );
  }

  return (
    <NaverMap defaultCenter={state} defaultZoom={13} ref={setMap}>
      {location.map((stat) => {
        return (
          <Marker
            position={new navermaps.LatLng(stat.shopLat, stat.shopLon)}
            key={location.shopId}
          />
        );
      })}
      ;
      <button onClick={handleClick} style={{ position: "absolute" }}>
        클릭!
      </button>
      <InfoWindow ref={setInfoWindow} />
    </NaverMap>
  );
};

export default Map;
