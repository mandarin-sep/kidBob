import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { asyncDaegu } from "../store/daeguSlice";
import { MapSlice } from "../store/MapSlice";
import { useNavigate } from "react-router-dom";
import SelectBox from "./SelectBox";
import pickCenter from "../assets/pickCenter.js";

const ChooseZone = () => {
  const { naver } = window;
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [division, setDivision] = useState("");
  const data = useSelector((state) => state);
  const state = useSelector((state) => state.loca.location);
  const navigate = useNavigate();

  //onChange함수에서 적용해줄 좌표값
  const BukGu = new naver.maps.LatLng(35.905731, 128.563439);
  const DalSeoGu = new naver.maps.LatLng(35.836634, 128.517682);
  const DalSungGun = new naver.maps.LatLng(35.723277, 128.538638);
  const JungGu = new naver.maps.LatLng(35.866423, 128.593182);
  const DongGu = new naver.maps.LatLng(35.895176, 128.671143);
  const SeoGu = new naver.maps.LatLng(35.87176, 128.5592);
  const SuSeongGu = new naver.maps.LatLng(35.840878, 128.662889);
  const NamGu = new naver.maps.LatLng(35.844144, 128.584339);

  const DaeGu = [
    "",
    BukGu,
    JungGu,
    DongGu,
    SeoGu,
    SuSeongGu,
    NamGu,
    DalSeoGu,
    DalSungGun,
  ];

  const handleChange = (e) => {
    setValue(e.target.value);
    setIndex(e.target.selectedIndex);
  };

  const handleDataFetch = () => {
    if (value === "") {
      alert("찾길 원하는 행정구역을 선택해주세요");
      return;
    }

    if (division.length === 0) {
      alert("동/읍/면을 선택하세요");
      return;
    }

    //동/읍/면의 중심 좌표 설정할 함수
    const centerValue = pickCenter(value, division);
    const centerPosition = new naver.maps.LatLng(
      centerValue[0],
      centerValue[1]
    );

    console.log(centerPosition);
    dispatch(asyncDaegu(value));
    dispatch(MapSlice.actions.setLocation(centerPosition));
    dispatch(MapSlice.actions.isOpen(false));
    dispatch(MapSlice.actions.setShopType(""));
    dispatch(MapSlice.actions.setDivision(division));
    navigate("/main");
  };

  return (
    <Container>
      <StyledSelect name="area" id="area-select" onChange={handleChange}>
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
  );
};

const StyledSelect = styled.select`
  width: 75%;
  height: 100%;
  font-size: 14px;
  margin-right: 4px;
  border-radius: 4px;
`;

const StyledButton = styled.button`
  width: 20%;
  height: 100%;
  font-size: 12px;
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

export default ChooseZone;
