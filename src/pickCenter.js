import latlng from "./assets/LatLng.json";

export default function pickCenter(distrinct, division) {
  let filteredData = latlng.filter((item) => {
    return item.sgg_nm === distrinct;
  });

  filteredData = filteredData.filter((item) => {
    return item.emd_nm === division;
  });

  return [filteredData[0].center_lati, filteredData[0].center_long];
}
