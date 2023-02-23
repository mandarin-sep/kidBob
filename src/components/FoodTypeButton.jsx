import React from "react";
import { useDispatch } from "react-redux";
import { MapSlice } from "../store/MapSlice";

const FoodTypeButton = () => {
  const dispatch = useDispatch();

  //버튼을 클릭하면 해당하는 버튼의 shopBsType에 해당하는 숫자가 store로 dispatch
  const handleClick = (e) => {
    const type = e.target.id;
    dispatch(MapSlice.actions.setShopType(type));
    dispatch(MapSlice.actions.isOpen(false));
  };
  return (
    <>
      <button id="12" onClick={handleClick}>
        분식
      </button>
      <button id="13" onClick={handleClick}>
        한식
      </button>
      <button id="11" onClick={handleClick}>
        중식
      </button>
      <button id="15" onClick={handleClick}>
        피자
      </button>
      <button id="17" onClick={handleClick}>
        패스트푸드
      </button>
      <button id="18" onClick={handleClick}>
        돈까스
      </button>
      <button id="19" onClick={handleClick}>
        도시락/죽
      </button>
      <button id="20" onClick={handleClick}>
        카페
      </button>
      <button id="23" onClick={handleClick}>
        편의점
      </button>
    </>
  );
};

export default FoodTypeButton;
