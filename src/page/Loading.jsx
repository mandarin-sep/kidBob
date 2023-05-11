import React from "react";
import styled, { keyframes } from "styled-components";

const Loading = () => {
  return (
    <StyledLoading>
      <StyledLodingItem></StyledLodingItem>
      <StyledLodingItem></StyledLodingItem>
      <StyledLodingItem></StyledLodingItem>
    </StyledLoading>
  );
};

export default Loading;

const StyledLoading = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const loadingAnimation = keyframes`
0%, 100% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
`;

const StyledLodingItem = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  animation: ${loadingAnimation} 1s linear infinite;
  background-color: #217af4;

  &:nth-child(1) {
    animation-delay: 0s;
  }

  &:nth-child(2) {
    animation-delay: 0.2s;
    margin: 0px 10px;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;
