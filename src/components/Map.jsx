import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NaverMap, useNavermaps, Marker } from "react-naver-maps";

const Map = () => {
  const [location, setLocation] = useState({});
  const state = useSelector((state) => state.loca.location);
  const marker = useSelector((state) => state.daegu.value);

  //마커를 렌더링 시키기 위해서 location(좌표가 들어있는 객체)가 변하면 re-render
  useEffect(() => {
    setLocation(marker);
  }, [location]);

  //지도의 중심을 바꿈
  useEffect(() => {
    if (map) {
      map.setCenter(state);
      map.setZoom(15, true);
    }
  }, [state]);

  const [map, setMap] = useState(null);

  //마커를 나타낼 좌표계를 가져오는 함수
  const handleClick = (e) => {
    e.preventDefault();
    if (map) {
      map.setCenter(state);
    }
    setLocation(marker);
  };

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
    </NaverMap>
  );
};

export default Map;
