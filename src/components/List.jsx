import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

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

  if (value.length === 0) {
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
  height: 100%;
  white-space: nowrap;
  list-style: none;
  padding: 0;
  position: relative;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #217af4;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }
`;

export default List;
