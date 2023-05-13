import React from "react";
import styled from "styled-components";
import ChooseZone from "../components/ChooseZoneSelector";

const IntroPage = () => {
  return (
    <PageContainer>
      <MainBadge src="/Symbol_of_Daegu.svg" />
      <MainName>대구 광역시 아동급식카드 사용처</MainName>
      <ZoneSelectorContainer>
        <ChooseZone />
      </ZoneSelectorContainer>
    </PageContainer>
  );
};

const MainName = styled.h1`
  margin: 32px auto;
  z-index: 99;
`;

const MainBadge = styled.img`
  border-radius: 50%;
  margin: 42px auto 0 auto;
  width: 320px;
  height: 320px;
  z-index: 99;
  box-shadow: 5px 5px 8px 1px rgba(0, 0, 0, 0.3);
  background-color: #c9f5d9;
`;

const ZoneSelectorContainer = styled.div`
  width: 420px;
  height: 30px;
  z-index: 99;
  margin: 0 auto;
  font-size: 32px !important;
`;

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  &::before {
    content: "";
    background: url(/Daegu.jpg) no-repeat center;
    background-size: cover;
    opacity: 0.3;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;
export default IntroPage;
