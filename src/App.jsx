import TablePage from "./pages/TablePage";
import { BrowserRouter, Navigate, redirect, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AuthPage from "./pages/AuthPage";
import PostStudentPage from "./pages/PostStudentPage";
import { AdminPage } from "./features/auth-page/AdminPage/AdminPage";
import StudentPage from "./features/students/student-page/StudentPage";
import { useSelector } from "react-redux";
import { authToken } from "./features/auth-page/userSlice";

function App() {
  const token = useSelector(authToken);

  if (!token) {
    return (
      <Routes>
        <Route path="/" element={<AuthPage />} /> 
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TablePage />} />
          <Route path="/:title" element={<TablePage />} />
          <Route path="/addstud" element={<PostStudentPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="student/:studentId" element={<StudentPage />} />
          {/* <Route path="*" element={<Navigate to="/admin" replace />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
