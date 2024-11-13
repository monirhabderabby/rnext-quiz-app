// Packages
import { Route, Routes } from "react-router-dom";

// Local Imports
import "./App.css";
import Home from "./pages/home";
import Leaderboard from "./pages/leaderboard";
import Login from "./pages/login";
import Quiz from "./pages/quiz";
import Registration from "./pages/registration";
import Result from "./pages/result";
import NavbarFooterWrapper from "./routes/navbar-footer";

function App() {
  return (
    <>
      <Routes>
        <Route element={<NavbarFooterWrapper />}>
          <Route element={<Home />} path="/" />
          <Route element={<Quiz />} path="/quiz/:id" />
          <Route element={<Leaderboard />} path="/quiz/:id/leaderboard" />
        </Route>

        <Route element={<Result />} path="/quiz/:id/result" />

        <Route element={<Login />} path="/login" />
        <Route element={<Registration />} path="/registration" />
      </Routes>
    </>
  );
}

export default App;
