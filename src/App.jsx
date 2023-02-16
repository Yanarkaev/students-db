import TablePage from "./pages/TablePage";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AuthPage from "./pages/AuthPage";
import PostStudentPage from "./pages/PostStudentPage";
import { AdminPage } from "./features/auth-page/AdminPage/AdminPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TablePage />} />
          <Route path="/:title" element={<TablePage />} />
          <Route path="/signin" element={<AuthPage />} />
          <Route path="/addstud" element={<PostStudentPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
