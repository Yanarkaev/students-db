import { FilterBar, Header } from "./components";
import { Input } from "./components/iu";
import AddStudent from "./features/students/add-student/AddStudent";
import { useStudents } from "./shared/hooks/useStudents";
import Auth from "./features/auth-page/Auth";
import { Table } from "./components/iu/Table/Table";
import TablePage from "./pages/TablePage";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AuthPage from "./pages/AuthPage";
import PostStudentPage from "./pages/PostStudentPage";
import { AdminPage } from "./features/auth-page/AdminPage/AdminPage";

function App() {
  const [students, loading, error] = useStudents();

  console.log(students, loading, error);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TablePage />} />
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
