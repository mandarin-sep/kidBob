import React from "react";
import Map from "../components/Map";
import { Container as MapDiv } from "react-naver-maps";
import styled from "styled-components";
import SearchSection from "./SearchSection";
import FoodTypeButton from "../components/FoodTypeButton";

const MainPage = () => {
  return (
    <AppContainer>
      <SearchSection />
      <MapContainer>
        <MapDiv style={{ width: "100%", height: "100%" }}>
          <Map />
        </MapDiv>
        <FoodTypeButton />
      </MapContainer>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  display: flex;
`;

const MapContainer = styled.div`
  height: 100vh;
  width: 80vw;
  position: relative;
`;

export default MainPage;
