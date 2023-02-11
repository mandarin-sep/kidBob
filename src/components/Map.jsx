import React, { useEffect, useRef } from "react";

const Map = () => {
  const mapElement = useRef(null);

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;
    const location = new naver.maps.LatLng(37.3595704, 127.105399);
    const mapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);

    new naver.maps.Marker({
      position: location,
      map,
    });
  }, []);
  return (
    <div ref={mapElement} style={{ minHeight: "400px", minWidth: "400px" }} />
  );
};

export default Map;
