import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NaverMap, useNavermaps, Marker, InfoWindow } from "react-naver-maps";

const Map = () => {
  //네이버 지도 api 호출
  const navermaps = useNavermaps();

  const [location, setLocation] = useState([]);
  const [zoomControl, setZoomControl] = useState(true);
  const [filteredShopList, setFilteredShopList] = useState([]);
  const pickedShopLocation = useSelector((state) => state.loca.location);
  const shopInfo = useSelector((state) => state.daegu.value);
  const info = useSelector((state) => state.loca.value);
  const isOpen = useSelector((state) => state.loca.boolean);
  const type = useSelector((state) => state.loca.type);
  const division = useSelector((state) => state.loca.division);

  //naverMap의 map과 infowindow에 useRef말고 useState로 접근
  const [map, setMap] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);

  //마커를 렌더링해줄 정보를 location 변수에 담아줌
  useEffect(() => {
    let filteredInfo = shopInfo.filter(
      (item) => item.shopAddr.split(" ")[0] === division
    );
    setLocation(filteredInfo);
    setFilteredShopList(filteredInfo);
  }, [shopInfo]);

  //지도의 중심이 바뀌면 지도의 줌단계를 바꿈
  useEffect(() => {
    if (map) {
      if (isOpen) {
        map.updateBy(pickedShopLocation, 18);
        setZoomControl(false);
      } else {
        map.setZoom(16, true);
      }
    }

    if (infoWindow) {
      infoWindow.close();
    }
  }, [pickedShopLocation]);

  //가게 종류별로 필터링
  useEffect(() => {
    if (type !== "") {
      setLocation(filteredShopList.filter((shop) => shop.shopBsType === type));
    }

    if (type === "all") setLocation(filteredShopList);

    if (infoWindow) {
      infoWindow.close();
    }
  }, [type]);

  //infoWindow 설정
  if (infoWindow && isOpen) {
    infoWindow.setContent(
      `<span style="font-size:14px; width: 206px; height: 36px; box-sizing: border-box; line-height: 14px; padding: 4px;">
         ${info.shopName} 
        </span>`
    );
    const infoState = pickedShopLocation.destinationPoint(0, 15);
    if (isOpen) {
      infoWindow.open(map, infoState);
    }
  }

  return (
    <NaverMap
      center={pickedShopLocation}
      ref={setMap}
      scrollWheel={zoomControl}
    >
      {location.map((stat) => {
        return (
          <Marker
            position={new navermaps.LatLng(stat.shopLat, stat.shopLon)}
            title={stat.shopName}
          />
        );
      })}
      ;
      <InfoWindow ref={setInfoWindow} />
    </NaverMap>
  );
};

export default Map;
