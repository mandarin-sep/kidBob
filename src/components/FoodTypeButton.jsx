import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { MapSlice } from "../store/MapSlice";
import { ReactComponent as Cafe } from "../assets/cafe.svg";
import { ReactComponent as Pizza } from "../assets/pizza.svg";
import { ReactComponent as Hamburger } from "../assets/hamburger.svg";
import { ReactComponent as Hansik } from "../assets/hansik.svg";
import { ReactComponent as Jjajangmyun } from "../assets/jjajangmyun.svg";
import { ReactComponent as Kimbap } from "../assets/kimbap.svg";
import { ReactComponent as Store } from "../assets/store.svg";
import { ReactComponent as Donggga } from "../assets/dongggas.svg";
import { ReactComponent as Dosirock } from "../assets/dosirock.svg";

const FoodTypeButton = () => {
  const dispatch = useDispatch();

  //버튼을 클릭하면 해당하는 버튼의 shopBsType에 해당하는 숫자가 store로 dispatch
  const handleClick = (e) => {
    const type = e.target.id;
    dispatch(MapSlice.actions.setShopType(type));
    dispatch(MapSlice.actions.isOpen(false));
  };
  return (
    <FoodButtonContainer>
      <StyledButton id="all" onClick={handleClick}>
        {"   "}
        전체 보기
      </StyledButton>
      <StyledButton id="12" onClick={handleClick}>
        <Kimbap width="16" height="16" />
        분식
      </StyledButton>
      <StyledButton id="13" onClick={handleClick}>
        <Hansik width="16" height="16" />
        한식
      </StyledButton>
      <StyledButton id="11" onClick={handleClick}>
        <Jjajangmyun width="16" height="16" />
        중식
      </StyledButton>
      <StyledButton id="15" onClick={handleClick}>
        <Pizza width="16" height="16" />
        피자
      </StyledButton>
      <StyledButton id="17" onClick={handleClick}>
        <Hamburger width="16" height="16" />
        패스트푸드
      </StyledButton>
      <StyledButton id="18" onClick={handleClick}>
        <Donggga width="16" height="16" />
        돈까스
      </StyledButton>
      <StyledButton id="19" onClick={handleClick}>
        <Dosirock width="16" height="16" />
        도시락/죽
      </StyledButton>
      <StyledButton id="20" onClick={handleClick}>
        <Cafe width="16" height="16" />
        카페
      </StyledButton>
      <StyledButton id="23" onClick={handleClick}>
        <Store width="16" height="16" />
        편의점
      </StyledButton>
    </FoodButtonContainer>
  );
};

export default FoodTypeButton;

const StyledButton = styled.button`
  border-radius: 0px;
  font-size: 15px;
  font-weight: 600;
  padding: 14px 11px 13px;
  background-color: rgba(0, 0, 0, 0);
  transition: color 0.25s;

  &:hover {
    color: #0475f4;
  }
`;

const FoodButtonContainer = styled.article`
  position: absolute;
  top: 2vh;
  left: 1vw;
  background: #fff;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;
