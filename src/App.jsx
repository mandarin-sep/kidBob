import { useDispatch, useSelector } from "react-redux";

import { asyncDaegu } from "./store/daeguSlice";

import { useState } from "react";
import Map from "./components/Map";
function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    console.log(value, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  console.log(data);
  return (
    <div className="App">
      <button onClick={() => dispatch(asyncDaegu(value))}>
        대구 정보 가져오기
      </button>
      <br />
      <button onClick={() => setCount(count + 1)}>+</button>
      <span>{count}</span>
      <button onClick={() => setCount(count - 1)}>-</button>

      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={handleChange} />
        <input type="submit" />
      </form>

      <Map />
    </div>
  );
}

export default App;
