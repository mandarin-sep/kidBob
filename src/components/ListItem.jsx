import { MapSlice } from "../store/MapSlice";
import { useDispatch } from "react-redux";
import styled from "styled-components";

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

  //shopBsType를 한국어로 변환
  let shopType;
  switch (shopBsType) {
    case "10":
      shopType = "치킨/찜닭";
      break;
    case "11":
      shopType = "중식";
      break;
    case "12":
      shopType = "분식";
      break;
    case "13":
      shopType = "한식";
      break;
    case "14":
      shopType = "찜/탕";
      break;
    case "15":
      shopType = "피자";
      break;
    case "16":
      shopType = "족발/보쌈";
      break;
    case "17":
      shopType = "패스트푸드";
      break;
    case "18":
      shopType = "돈까스/일식";
      break;
    case "19":
      shopType = "도시락/죽";
      break;
    case "20":
      shopType = "카페/디저트";
      break;
    case "21":
      shopType = "아시안/양식";
      break;
    case "22":
      shopType = "반찬/신선";
      break;
    case "23":
      shopType = "편의점";
      break;

    default:
      shopType = "기타";
      break;
  }

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
        <ShopTypeArea>{shopType}</ShopTypeArea>
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
