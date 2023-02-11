import { useRef, useEffect } from "react";

const Map = ({ location }) => {
  const mapElement = useRef(null);

  useEffect(() => {
    const { naver } = window;

    if (!mapElement.current || !naver) return;

    const mapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });
  }, [location]);

  return <div ref={mapElement} style={{ minHeight: "400px" }} />;
};

export default Map;
