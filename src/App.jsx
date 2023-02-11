import { useState } from "react";
import Main from "./components/Main";
import Map from "./components/Map";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <br />
      <button onClick={() => setCount(count + 1)}>+</button>
      <span>{count}</span>
      <button onClick={() => setCount(count - 1)}>-</button>
      <Main />
      <Map />
    </div>
  );
}

export default App;
