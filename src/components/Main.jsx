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
    dispatch(asyncDaegu(value));
    dispatch(MapSlice.actions.setLocation(DaeGu[index]));
    dispatch(MapSlice.actions.isOpen(false));
    dispatch(MapSlice.actions.setShopType(""));
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
  width: 28%;
  height: 100%;
  font-size: 12px;
  padding: 2px;
`;

const Container = styled.div`
  margin: 8px;
  height: 4vh;
  display: flex;
  justify-content: space-between;
`;

export default Main;
