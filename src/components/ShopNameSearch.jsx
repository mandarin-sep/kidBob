import React, { useState } from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";

const ShopNameSearch = ({ value, setShopList }) => {
  const [shopName, setShopName] = useState("");

  const shopNameValue = (e) => {
    setTimeout(() => {
      setShopName(e.target.value);
    }, 500);
  };

  const shopNameSearchClick = (e) => {
    e.preventDefault();
    setShopList(
      value.filter((listItem) => {
        const itemShopName = listItem.shopName;
        return itemShopName.includes(shopName);
      })
    );
  };

  return (
    <form onSubmit={shopNameSearchClick}>
      <InputContainer>
        <StyledButton type="submit">
          <BiSearch size="20px" color="#217af4" />
        </StyledButton>
        <StyledTextInput
          type="text"
          onChange={shopNameValue}
          placeholder="찾고 싶은 가게명"
        />
      </InputContainer>
    </form>
  );
};

export default ShopNameSearch;

const InputContainer = styled.div`
  border: 1px solid #217af4;
  border-radius: 5px;
  margin: 0 15px;
  display: flex;
`;

const StyledTextInput = styled.input`
  height: 42px;
  width: 100%;
  font-size: 16px;
  border: 0;
  outline: none;
  border-radius: 6px;

  &:focus {
    border: none;
  }
`;

const StyledButton = styled.button`
  width: 64px;
  padding: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0);
`;
