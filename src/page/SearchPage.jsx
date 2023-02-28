import styled from "styled-components";
import ChooseZone from "../components/ChooseZone";
import List from "../components/List";

export default function SearchPage() {
  return (
    <StyledContainer>
      <ChooseZone />
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
