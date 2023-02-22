import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ListItem from "./ListItem";

const List = () => {
  const value = useSelector((state) => state.daegu.value);

  if (value.length === 0) {
    return <div>없음</div>;
  }

  return (
    <StyledUl>
      {value.map((item) => {
        return <ListItem item={item} key={item.shopId} />;
      })}
    </StyledUl>
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
