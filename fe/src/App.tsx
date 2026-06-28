import "./App.css"; // 에러 시 './index.css'로 변경
import { Route, Routes } from "react-router-dom";
import EducationChilderenPage from "./page/EducationChilderenPage";
import ShootingGamePage from "./page/ShootingGamePage";
import SurfGamePage from "./page/SurfGamePage";

function App() {
  return (
    <div className="App">
      <>
        <Routes>
          <Route path="/demo_1" element={<EducationChilderenPage />} />
          <Route path="/demo_2" element={<ShootingGamePage />} />
          <Route path="/demo_3" element={<SurfGamePage />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
