import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import { DailyLogPage } from "./pages/logging/DailyLogPage";
import { CalenderPage } from "./pages/logging/CalendarPage";

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/DailyLog" element={<DailyLogPage/>}/>
        <Route path="/Calender" element={<CalenderPage/>}/>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
