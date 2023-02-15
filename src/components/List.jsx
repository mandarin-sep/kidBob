import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ListItem from "./ListItem";

const List = () => {
  const value = useSelector((state) => state.daegu.value);

  if (JSON.stringify(value) === "{}") {
    return <div>없음</div>;
  }

  return (
    <ul>
      {value.map((item) => {
        return <ListItem item={item} />;
      })}
    </ul>
  );
};

const StlyedUl = styled.ul``;

export default List;
