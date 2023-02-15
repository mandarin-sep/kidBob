import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { asyncDaegu } from "../store/daeguSlice";
import { MapSlice } from "../store/MapSlice";

const Main = () => {
  const { naver } = window;
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const data = useSelector((state) => state);
  const state = useSelector((state) => state.loca.location);

  //onChange함수에서 적용해줄 좌표값
  const BukGu = new naver.maps.LatLng(35.85557, 128.5829);
  const DalSeoGu = new naver.maps.LatLng(35.82987, 128.5327);
  const DalSungGun = new naver.maps.LatLng(35.7746, 123.4314);
  const JungGu = new naver.maps.LatLng(35.86934, 128.6062);
  const DongGu = new naver.maps.LatLng(35.88666, 128.6356);
  const SeoGu = new naver.maps.LatLng(35.87176, 128.5592);
  const SuSeongGu = new naver.maps.LatLng(35.85817, 128.6306);
  const NamGu = new naver.maps.LatLng(35.846, 128.5975);

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
    dispatch(asyncDaegu(value));
    dispatch(MapSlice.actions.setLocation(DaeGu[index]));
    dispatch(
      MapSlice.actions.setInfo({
        isOpen: false,
      })
    );
  };
  return (
    <Container>
      <StyledSelect name="area" id="area-select" onChange={handleChange}>
        <option value="">행정구역을 선택해주세요</option>
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
      <StyledButton onClick={handleDataFetch}>찾아보기</StyledButton>
    </Container>
  );
};

const StyledSelect = styled.select`
  width: 70%;
  height: 100%;
  font-size: 18px;
  margin-right: 4px;
`;

const StyledButton = styled.button`
  width: 24%;
  height: 100%;
  font-size: 12px;
`;

const Container = styled.div`
  margin: 8px;
  height: 4vh;
`;

export default Main;
