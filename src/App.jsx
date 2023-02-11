import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Main from "./components/Main";
import Map from "./components/Map";
function App() {
  const [count, setCount] = useState(0);
  const { naver } = window;
  const state = useSelector((state) => state.loca.location);

  const [location, setLocation] = useState({});

  return (
    <div className="App">
      <br />
      <button onClick={() => setLocation(busan)}>+</button>
      <Main />
      <Map location={state} />
    </div>
  );
}

export default App;
