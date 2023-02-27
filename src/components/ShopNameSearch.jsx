import React, { useState } from "react";

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
      <input
        type="text"
        onChange={shopNameValue}
        placeholder="찾고 싶은 가게명"
      />
      <input type="submit" value="찾기" />
    </form>
  );
};

export default ShopNameSearch;
