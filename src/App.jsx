// Packages
import { Route, Routes } from "react-router-dom";

// Local Imports
import "./App.css";
import DashboardContainer from "./components/ui/dashboard-container";
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import Leaderboard from "./pages/leaderboard";
import Login from "./pages/login";
import Quiz from "./pages/quiz";
import QuizCreationDashboard from "./pages/quiz-creation-dashboard";
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

        <Route element={<Dashboard />} path="/dashboard">
          <Route element={<DashboardContainer />} index />
          <Route element={<QuizCreationDashboard />} path="quizzes/create" />
        </Route>
      </Routes>
    </>
  );
}

export default App;
