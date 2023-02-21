import { MapSlice } from "../store/MapSlice";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const ListItem = ({ item }) => {
  const { naver } = window;
  const dispatch = useDispatch();
  const { shopName, shopRoadAddr, shopTel, shopAddr, shopLat, shopLon } = item;
  const newCenter = new naver.maps.LatLng(shopLat, shopLon);

  const handleClick = () => {
    dispatch(MapSlice.actions.setLocation(newCenter));
    dispatch(
      MapSlice.actions.setInfo({
        information: {
          shopName,
          shopRoadAddr,
          shopTel,
          shopAddr,
        },
      })
    );
    dispatch(MapSlice.actions.isOpen({ isOpen: true }));
  };

  return (
    <StyledLi
      key={item.shopId}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <h3>{shopName}</h3>
      <span>가게주소: {shopAddr}</span>
      <br />
      <span>도로명주소: {shopRoadAddr}</span>
      <br />
      <span>가게 전화: {shopTel}</span>
    </StyledLi>
  );
};

const StyledLi = styled.li`
  padding: 16px;
  &:not(:last-child) {
    border-bottom: 1px solid #777;
  }
`;

export default ListItem;
