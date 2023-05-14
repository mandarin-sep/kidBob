import { MapSlice } from "../store/MapSlice";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import shopType from "../shopType";

const ListItem = ({ item }) => {
  const { naver } = window;
  const dispatch = useDispatch();
  const {
    shopName,
    shopRoadAddr,
    shopTel,
    shopAddr,
    shopLat,
    shopLon,
    shopBsType,
    wdFrTime,
    wdToTime,
    hoFrTime,
    hoToTime,
  } = item;
  const newCenter = new naver.maps.LatLng(shopLat, shopLon);

  //가게 정보를 클릭했을때 가게의 marker에 띄워줄 infoWindow를 위한 정보를 RTK store에 전달
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

  //평일 영업시간
  let shopTime;
  if (wdToTime === "0000" && wdFrTime === "0000") {
    shopTime = "연중무휴";
  } else {
    let start = wdFrTime.split("");
    let end = wdToTime.split("");
    shopTime = `${start[0]}${start[1]}:${start[2]}${start[3]} ~ ${end[0]}${end[1]}:${end[2]}${end[3]}`;
  }

  return (
    <StyledLi key={item.shopId} onClick={handleClick}>
      <div>
        <NameArea>{shopName}</NameArea>
        <ShopTypeArea>{shopType(shopBsType)}</ShopTypeArea>
      </div>

      <div style={{ marginTop: "8px" }}>
        <InfoType>지번</InfoType>
        {shopAddr}
      </div>
      <div>
        <InfoType>도로명</InfoType>
        {shopRoadAddr}
      </div>
      <div>
        <InfoType>Phone</InfoType>
        {shopTel}
      </div>

      <div>
        <InfoType>영업시간</InfoType>
        {shopTime}
      </div>
    </StyledLi>
  );
};

const StyledLi = styled.li`
  padding: 21px 25px 18px;
  &:not(:last-child) {
    border-bottom: 1px solid #ecf0f2;
  }
  cursor: pointer;
  &:hover {
    background-color: rgba(233, 236, 239, 0.6);
  }
`;

const NameArea = styled.h3`
  font-weight: 700;
  font-size: 18px;
  color: #0068c3;
  margin: 0 6px 0 0;
  display: inline;
`;

const ShopTypeArea = styled.span`
  font-size: 14px;
  color: #8f8f8f;
  &:before {
    content: "";
    border-right: 1px solid #8f8f8f;
    margin: 6px;
  }
`;

const InfoType = styled.span`
  box-sizing: border-box;
  border: 1px solid #dee0e2;
  font-size: 11px;
  margin: 2px 6px 0 0;
  line-height: 1.3rem;
  color: #909090;
  padding: 1px 2px;
  text-align: center;
`;
export default ListItem;
