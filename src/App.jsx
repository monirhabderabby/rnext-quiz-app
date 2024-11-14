// Packages
import { Route, Routes } from "react-router-dom";

// Local Imports
import "./App.css";
import DashboardContainer from "./components/ui/dashboard-container";
import Dashboard from "./pages/dashboard";
import DashboardQuestionsSetupContainer from "./pages/dashboard-quiz-set-question";
import Home from "./pages/home";
import Leaderboard from "./pages/leaderboard";
import Login from "./pages/login";
import Quiz from "./pages/quiz";
import QuizCreationDashboard from "./pages/quiz-creation-dashboard";
import Registration from "./pages/registration";
import Result from "./pages/result";
import AdminRoutes from "./routes/admin-routes";
import NavbarFooterWrapper from "./routes/navbar-footer";
import PrivateRoutes from "./routes/private-routes";

function App() {
  return (
    <>
      <Routes>
        <Route element={<NavbarFooterWrapper />}>
          <Route element={<Home />} path="/" />
          <Route
            element={
              <PrivateRoutes>
                <Quiz />
              </PrivateRoutes>
            }
            path="/quiz/:id"
          />
          <Route
            element={
              <PrivateRoutes>
                <Leaderboard />
              </PrivateRoutes>
            }
            path="/quiz/:id/leaderboard"
          />
        </Route>

        <Route
          element={
            <PrivateRoutes>
              <Result />
            </PrivateRoutes>
          }
          path="/quiz/:id/result"
        />

        <Route element={<Login />} path="/login" />
        <Route element={<Registration />} path="/registration" />

        <Route element={<AdminRoutes />}>
          <Route element={<Dashboard />} path="/dashboard">
            <Route element={<DashboardContainer />} index />
            <Route element={<QuizCreationDashboard />} path="quizzes/create" />
            <Route
              element={<DashboardQuestionsSetupContainer />}
              path="quizzes/create/setup"
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
