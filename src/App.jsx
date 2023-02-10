import { useDispatch, useSelector } from "react-redux";
import { asyncGg } from "./store/ggSlice";
import { asyncCb } from "./store/cbSlice";
import { asyncDaegu } from "./store/daeguSlice";
import { asyncIncheon } from "./store/incheonSlice";
import { asyncGw } from "./store/gwSlice";

function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  console.log(data);
  return (
    <div className="App">
      <button onClick={() => dispatch(asyncGg())}>경기도 정보 가져오기</button>
      <button onClick={() => dispatch(asyncGw())}>강원도 정보 가져오기</button>
      <button onClick={() => dispatch(asyncIncheon())}>
        인천 정보 가져오기
      </button>
      <button onClick={() => dispatch(asyncDaegu())}>대구 정보 가져오기</button>

      <button onClick={() => dispatch(asyncCb())}>
        충청북도 정보 가져오기
      </button>
    </div>
  );
}

export default App;
