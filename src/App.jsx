import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Leaderboard from "./pages/leaderboard";
import Login from "./pages/login";
import Quiz from "./pages/quiz";
import Result from "./pages/result";
import NavbarFooterWrapper from "./routes/navbar-footer";

function App() {
  return (
    <>
      <Routes>
        <Route element={<NavbarFooterWrapper />}>
          <Route element={<Home />} path="/" />
        </Route>

        <Route element={<Quiz />} path="/quiz/:id" />
        <Route element={<Result />} path="/quiz/:id/result" />
        <Route element={<Leaderboard />} path="/quiz/:id/leaderboard" />
        <Route element={<Login />} path="/login" />
      </Routes>
    </>
  );
}

export default App;
