import Map from "./components/Map";
import { Container as MapDiv } from "react-naver-maps";
import styled from "styled-components";
import SearchPage from "./page/SearchPage";
import FoodTypeButton from "./components/FoodTypeButton";
import IntroPage from "./page/IntroPage";

function App() {
  // return (
  //   <AppContainer>
  //     <br />
  //     <SearchPage />
  //     <MapContainer>
  //       <MapDiv style={{ width: "100%", height: "100%" }}>
  //         <Map />
  //       </MapDiv>

  //       <FoodTypeButton />
  //     </MapContainer>
  //   </AppContainer>
  // );
  return <IntroPage />;
}

const AppContainer = styled.div`
  display: flex;
`;

const MapContainer = styled.div`
  height: 100vh;
  width: 80vw;
  position: relative;
`;

export default App;
