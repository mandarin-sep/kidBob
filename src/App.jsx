import Map from "./components/Map";
import { Container as MapDiv } from "react-naver-maps";
import styled from "styled-components";
import SearchPage from "./components/SearchPage";
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
      </MapContainer>

      <FoodButtonContainer>
        <FoodTypeButton />
      </FoodButtonContainer>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
`;

const MapContainer = styled.div`
  height: 95vh;
  width: 80vw;
`;

const FoodButtonContainer = styled.section`
  position: absolute;
  bottom: 0;
  right: 0;
`;

export default App;
