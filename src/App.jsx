import Map from "./components/Map";
import { Container as MapDiv } from "react-naver-maps";
import styled from "styled-components";
import SearchPage from "./page/SearchPage";
import FoodTypeButton from "./components/FoodTypeButton";
function App() {
  return (
    <AppContainer>
      <br />
      <SearchPage />
      <MapContainer>
        <MapDiv style={{ width: "100%", height: "100%" }}>
          <Map />
        </MapDiv>

        <FoodButtonContainer>
          <FoodTypeButton />
        </FoodButtonContainer>
      </MapContainer>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
`;

const MapContainer = styled.div`
  height: 95vh;
  width: 80vw;
  position: relative;
`;

const FoodButtonContainer = styled.section`
  position: absolute;
  top: 0;
  left: 0;
`;

export default App;
