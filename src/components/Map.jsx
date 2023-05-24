import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NaverMap, useNavermaps, Marker, InfoWindow } from "react-naver-maps";
import shopType from "../shopType";

const Map = () => {
  //네이버 지도 api 호출
  const navermaps = useNavermaps();

  //naverMap의 map과 infowindow에 useRef말고 useState로 접근
  const [map, setMap] = useState(null);

  const [location, setLocation] = useState([]);
  const [zoomControl, setZoomControl] = useState(true);
  const [filteredShopList, setFilteredShopList] = useState([]);
  const [myPosition, setMyPosition] = useState();
  const division = useSelector((state) => state.loca.division);

  const pickedShopLocation = useSelector((state) => state.loca.location);
  const shopInfo = useSelector((state) => state.daegu.value);

  const itemClicked = useSelector((state) => state.loca.listitemClicked);
  const clickedShop = useSelector((state) => state.loca.info);
  const type = useSelector((state) => state.loca.type);

  const [open, setOpen] = useState(false);

  const [newInfo, setNewInfo] = useState(null);

  //클릭시 infoWindow에 가게 정보 띄워주기 위한 블록
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [stateChange, setStateChange] = useState(false);

  const MarkerRef = useRef([]);
  let idx = 0;

  const handleMarkerClick = (marker) => {
    if (selectedMarker && selectedMarker.shopName === marker.shopName) {
      //Marker를 클릭해서 open한 info창을 한번 더 클릭했을때
      setOpen(false);
      setSelectedMarker(null);
      infoWindow.close();
    } else if (isClicked && !selectedMarker) {
      //ListItem을 클릭해서 info창이 열려있는 상태에서 다른 마커를 클릭했을때
      setIsClicked(false);
      newInfo.close();
      setOpen(false);
    } else {
      //info창이 열려있는상태에서 다른 마커를 클릭했을때 or info창이 닫혀있는 상태에서 마커를 클릭했을때
      setSelectedMarker(marker);
      setOpen(true);
    }

    setStateChange(false);
  };

  //현재 위치 표시
  let icon = {
    url: "https://cdn.icon-icons.com/icons2/317/PNG/512/map-marker-icon_34392.png",
    scaledSize: new naver.maps.Size(32, 32),
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const LatLng = new navermaps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        setMyPosition(LatLng);
      });
    }
  }, []);

  //마커를 렌더링해줄 정보를 location 변수에 담아줌
  useEffect(() => {
    let filteredInfo = shopInfo.filter(
      (item) => item.shopAddr.split(" ")[0] === division
    );
    setLocation(filteredInfo);
    setFilteredShopList(filteredInfo);
    idx = 0;

    setStateChange(true);
    setOpen(false);
    setSelectedMarker(null);
    setIsClicked(false);
  }, [shopInfo]);

  //가게 종류별로 필터링
  useEffect(() => {
    if (type !== "") {
      setLocation(filteredShopList.filter((shop) => shop.shopBsType === type));
    }

    if (type === "all") setLocation(filteredShopList);

    setStateChange(true);
    setOpen(false);
    setSelectedMarker(null);
    setIsClicked(false);
  }, [type]);

  //지도의 중심이 바뀌면 지도의 줌단계를 바꿈
  useEffect(() => {
    if (map) {
      setSelectedMarker(null);
      if (itemClicked) {
        map.updateBy(pickedShopLocation, 18);
        setZoomControl(true);

        setIsClicked(true);
        setStateChange(false);
        setOpen(true);
      } else {
        map.setZoom(16, true);
      }
    }
  }, [pickedShopLocation]);

  //infoWindow 설정
  if (open && selectedMarker && !stateChange) {
    let ref = MarkerRef.current.filter((item) => item);

    ref = ref.filter((item) => {
      return item.title === selectedMarker.shopName;
    });

    infoWindow.setContent(
      `<div style="box-sizing: border-box; padding: 8px;">
      <div>
      <h3 style="font-weight: 700; color: #0068c3; margin: 0 6px 0 0; line-height: 14px; display: inline;">
      ${selectedMarker.shopName} 
      </h3>
      <span style="color: #8f8f8f; font-size: 14px;">${shopType(
        selectedMarker.shopBsType
      )}</span>
      </div>
      <div>${selectedMarker.shopRoadAddr}</div>
      </div>
        `
    );
    infoWindow.open(map, ref[0]);
  }

  //ItemClick InfoWindow
  if (newInfo && isClicked && !stateChange) {
    let ref = MarkerRef.current.filter((item) => item);

    ref = ref.filter((item) => {
      return item.title === clickedShop.shopName;
    });

    newInfo.setContent(
      `<div style="box-sizing: border-box; padding: 8px;">
      <div>
      <h3 style="font-weight: 700; color: #0068c3; margin: 0 6px 0 0; line-height: 14px; display: inline;">
      ${clickedShop.shopName}
      </h3>
      <span style="color: #8f8f8f; font-size: 14px;">${shopType(
        clickedShop.shopBsType
      )}</span>
      </div>
      <div>${clickedShop.shopRoadAddr}</div>
      </div>
        `
    );
    newInfo.open(map, ref[0]);
  }

  //타입이 변할때 마다 infoWindow 창 닫아줌
  if (stateChange && infoWindow) {
    infoWindow.close();
  }

  if (stateChange && newInfo) {
    newInfo.close();
  }

  //마커 정보가 들어오지 않았을때 표시해줄 화면 => intro 페이지 제작후 삭제
  if (location.length === 0) {
    return <NaverMap></NaverMap>;
  }

  return (
    <NaverMap
      center={pickedShopLocation}
      ref={setMap}
      scrollWheel={zoomControl}
    >
      {myPosition && <Marker position={myPosition} icon={icon} />}
      {location.map((stat) => {
        return (
          <Marker
            id={idx}
            ref={(el) => (MarkerRef.current[idx++] = el)}
            position={new navermaps.LatLng(stat.shopLat, stat.shopLon)}
            title={stat.shopName}
            onClick={() => handleMarkerClick(stat)}
            key={stat.shopId}
          />
        );
      })}
      ;
      <InfoWindow ref={setInfoWindow} />
      <InfoWindow ref={setNewInfo} />
    </NaverMap>
  );
};

export default Map;
