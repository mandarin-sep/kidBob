import { MapSlice } from "../store/MapSlice";
import { useDispatch } from "react-redux";

const ListItem = ({ item }) => {
  const { naver } = window;
  const dispatch = useDispatch();
  const { shopName, shopRoadAddr, shopTel, shopAddr, shopLat, shopLon } = item;
  const newCenter = new naver.maps.LatLng(shopLat, shopLon);

  const handleClick = () => {
    dispatch(MapSlice.actions.setLocation(newCenter));
    dispatch(
      MapSlice.actions.setInfo({
        isOpen: true,
        infomation: {
          shopName,
          shopRoadAddr,
          shopTel,
          shopAddr,
          shopLat,
          shopLon,
        },
      })
    );
  };

  return (
    <li key={item.shopId} onClick={handleClick} style={{ cursor: "pointer" }}>
      <h3>{shopName}</h3>
      <span>가게주소: {shopAddr}</span>
      <br />
      <span>도로명주소: {shopRoadAddr}</span>
      <br />
      <span>가게 전화: {shopTel}</span>
    </li>
  );
};

export default ListItem;
