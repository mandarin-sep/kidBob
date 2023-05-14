export default function shopType(shopBsType) {
  let typeName;

  switch (shopBsType) {
    case "10":
      typeName = "치킨/찜닭";
      break;
    case "11":
      typeName = "중식";
      break;
    case "12":
      typeName = "분식";
      break;
    case "13":
      typeName = "한식";
      break;
    case "14":
      typeName = "찜/탕";
      break;
    case "15":
      typeName = "피자";
      break;
    case "16":
      typeName = "족발/보쌈";
      break;
    case "17":
      typeName = "패스트푸드";
      break;
    case "18":
      typeName = "돈까스/일식";
      break;
    case "19":
      typeName = "도시락/죽";
      break;
    case "20":
      typeName = "카페/디저트";
      break;
    case "21":
      typeName = "아시안/양식";
      break;
    case "22":
      typeName = "반찬/신선";
      break;
    case "23":
      typeName = "편의점";
      break;

    default:
      typeName = "기타";
      break;
  }

  return typeName;
}
