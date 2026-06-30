import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import EducationChilderenPage from "./page/EducationChilderenPage";
import ShootingGamePage from "./page/ShootingGamePage";
import SurfGamePage from "./page/SurfGamePage";
import MainPage from "./page/kioquiz/MainPage";
import { Background } from "./page/kioquiz/background/Background";
function App() {
  return (
    <div className="App min-h-screen bg-gray-100">
      {/* 상단 메뉴 */}
      <header className="bg-white shadow-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold text-gray-800">게임 데모 페이지</h1>

          <nav className="flex gap-3">
            <Link
              to="/demo_4"
              className="rounded-lg bg-emerald-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              퀴즈 페이지
            </Link>
            <Link
              to="/demo_3"
              className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              서핑 게임
            </Link>
            <Link
              to="/demo_1"
              className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              교육 게임 페이지
            </Link>

            <Link
              to="/demo_2"
              className="rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-600"
            >
              슈팅 게임
            </Link>
          </nav>
        </div>
      </header>

      {/* 페이지 내용 */}
      <main className="mx-auto max-w-5xl px-6 py-8">
        <Routes>
          <Route path="/demo_1" element={<EducationChilderenPage />} />
          <Route path="/demo_2" element={<ShootingGamePage />} />
          <Route path="/demo_3" element={<SurfGamePage />} />
          <Route
            path="/demo_4"
            element={
              <Background>
                <MainPage />
              </Background>
            }
          />

          {/* 기본 접속 시 보여줄 화면 */}
          <Route
            path="/"
            element={
              <div className="rounded-xl bg-white p-10 text-center shadow">
                <h2 className="mb-4 text-2xl font-bold text-gray-800">
                  데모를 선택해주세요
                </h2>
                <p className="text-gray-600">
                  위 메뉴에서 퀴즈,교육 게임 페이지, 슈팅 게임, 서핑 게임 중
                  하나를 선택하세요.
                </p>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
