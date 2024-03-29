import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Loading from "../page/Loading";
import ListItem from "./ListItem";
import ShopNameSearch from "./ShopNameSearch";

const List = () => {
  const value = useSelector((state) => state.daegu.value);
  const type = useSelector((state) => state.loca.type);
  const status = useSelector((state) => state.daegu.status);
  const division = useSelector((state) => state.loca.division);
  const [shopList, setShopList] = useState([]);
  const [filteredShopList, setFilteredShopList] = useState([]);

  useEffect(() => {
    let filteredList = value.filter(
      (item) => item.shopAddr.split(" ")[0] === division
    );

    setShopList(filteredList);
    setFilteredShopList(filteredList);
  }, [value]);

  useEffect(() => {
    if (type !== "") {
      setShopList(filteredShopList.filter((shop) => shop.shopBsType === type));
    }

    if (type === "all") setShopList(filteredShopList);
  }, [type]);

  if (status === "Loading") {
    return <Loading />;
  }

  return (
    <>
      <ShopNameSearch value={value} />
      <StyledUl>
        {shopList.length === 0 ? (
          <StyledEmptyList>
            조건에 맞는 가게가 <br /> 없습니다.
          </StyledEmptyList>
        ) : (
          <></>
        )}
        {JSON.stringify(shopList) !== "{}" ? (
          shopList.map((item) => {
            return <ListItem item={item} key={item.shopId} />;
          })
        ) : (
          <Loading />
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
  margin: 0;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #c9dbf5;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }
`;

const StyledEmptyList = styled.div`
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 800;
  font-size: 32px;
  color: #217af4;
`;

export default List;
