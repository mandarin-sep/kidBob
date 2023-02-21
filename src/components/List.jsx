import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { MapSlice } from "../store/MapSlice";
import ListItem from "./ListItem";

const List = () => {
  const value = useSelector((state) => state.daegu.value);
  const type = useSelector((state) => state.loca.type);
  const [shopList, setShopList] = useState([]);

  useEffect(() => {
    setShopList(value);
  }, [value]);

  useEffect(() => {
    if (type !== "") {
      setShopList(value.filter((shop) => shop.shopBsType === type));
    }
  }, [type]);

  if (JSON.stringify(value) === "{}") {
    return <div>없음</div>;
  }

  return (
    <>
      <StyledUl>
        {JSON.stringify(shopList) !== "{}" ? (
          shopList.map((item) => {
            return <ListItem item={item} key={item.shopId} />;
          })
        ) : (
          <div>로딩중</div>
        )}
      </StyledUl>
    </>
  );
};

const StyledUl = styled.ul`
  overflow-y: scroll;
  height: 90vh;
  white-space: nowrap;
  list-style: none;
  padding: 0;
  position: relative;
`;

export default List;
