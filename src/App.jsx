import IntroPage from "./page/IntroPage";
import { Routes, Route } from "react-router-dom";
import MainPage from "./page/MainPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IntroPage />}></Route>
      <Route path="/main" element={<MainPage />}></Route>
    </Routes>
  );
}

export default App;
