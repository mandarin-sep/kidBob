import styled from "styled-components";
import ChooseZone from "../components/ChooseZoneSelector";
import List from "../components/List";

export default function SearchPage() {
  return (
    <StyledContainer>
      <ZoneSelectorContainer>
        <ChooseZone />
      </ZoneSelectorContainer>
      <List />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 20vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ZoneSelectorContainer = styled.div`
  margin: 8px 15px;
  height: 2vh;
`;
