import Map from "./components/Map";
import { Container as MapDiv } from "react-naver-maps";
import styled from "styled-components";
import SearchPage from "./components/SearchPage";
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
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
`;

const MapContainer = styled.div`
  height: 100vh;
  width: 80vw;
`;

export default App;
