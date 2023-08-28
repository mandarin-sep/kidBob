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
    console.log(value, division);
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

  if (value.length === 0) {
    return <div></div>;
  }

  if (status === "Loading") {
    return <Loading />;
  }

  return (
    <>
      <ShopNameSearch value={value} />
      <StyledUl>
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

export default List;
