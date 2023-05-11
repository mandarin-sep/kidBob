import IntroPage from "./page/IntroPage";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./page/MainPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IntroPage />}></Route>
      <Route path="/main" element={<MainPage />}></Route>
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export default App;
