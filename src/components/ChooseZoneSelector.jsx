import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { asyncDaegu } from "../store/fetchListSlice";
import { ListInfoSlice } from "../store/ListInfoSlice";
import { useNavigate } from "react-router-dom";
import SelectBox from "./SelectBox";
import pickCenter from "../pickCenter.js";

const ChooseZone = () => {
  const { naver } = window;
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [division, setDivision] = useState("");
  const [validation, setValidation] = useState({
    isvalidate: true,
    message: "",
  });
  const navigate = useNavigate();

  const handleDataFetch = () => {
    if (value === "") {
      setValidation({
        isvalidate: false,
        message: "찾길 원하는 행정구역을 선택해주세요",
      });
      return;
    }

    if (division.length === 0) {
      setValidation({ isvalidate: false, message: "동/읍/면을 선택하세요" });
      return;
    }

    //동/읍/면의 중심 좌표 설정할 함수
    const centerValue = pickCenter(value, division);
    const centerPosition = new naver.maps.LatLng(
      centerValue[0],
      centerValue[1]
    );
    dispatch(asyncDaegu(value));
    dispatch(ListInfoSlice.actions.setLocation(centerPosition));
    dispatch(ListInfoSlice.actions.setShopType(""));
    dispatch(ListInfoSlice.actions.setDivision(division));
    navigate("/main");
  };

  return (
    <>
      <Container>
        <StyledSelect
          name="area"
          id="area-select"
          onChange={(e) => setValue(e.target.value)}
        >
          <option value="">찾고 싶은 행정구역을 선택해주세요</option>
          <option value="북구" id="BukGu">
            북구
          </option>
          <option value="중구" id="JungGu">
            중구
          </option>
          <option value="동구" id="DongGu">
            동구
          </option>
          <option value="서구" id="SeoGu">
            서구
          </option>
          <option value="수성구" id="SuSeongGu">
            수성구
          </option>
          <option value="남구" id="NamGu">
            남구
          </option>
          <option value="달서구" id="DalSeoGu">
            달서구
          </option>
          <option value="달성군" id="DalSungGun">
            달성군
          </option>
        </StyledSelect>
        <SelectBox location={value} setDivision={setDivision} />
        <StyledButton onClick={handleDataFetch}>찾아보기</StyledButton>
      </Container>
      {!validation.isvalidate && (
        <StyledError>{validation.message}</StyledError>
      )}
    </>
  );
};

const StyledSelect = styled.select`
  width: 75%;
  height: 100%;
  font-size: 1.6vh;
  margin-right: 4px;
  border-radius: 4px;
`;

const StyledButton = styled.button`
  width: 20%;
  height: 100%;
  font-size: 1vh;
  padding: 2px;
  background-color: #69a0f0;
  color: #fff;
  text-align: center;
  box-sizing: border-box;

  transition: all 100ms ease-in-out;

  &:hover {
    transform: scale(1.03);
  }
  box-sizing: border-box;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const StyledError = styled.div`
  width: 100%;
  font-size: 1.5vh;
  color: red;
  text-align: center;
  margin-top: 0.5rem;
  font-weight: 700;
`;

export default ChooseZone;
