import { FilterBar, Header } from "./components";
import { Input } from "./components/iu";
import AddStudent from "./features/students/add-student/AddStudent";
import { useStudents } from "./shared/hooks/useStudents";
import Auth from "./features/auth-page/Auth";
import { AdminPage } from "./features/auth-page/AdminPage/AdminPage";

function App() {
  const [students, loading, error] = useStudents();

  console.log(students, loading, error);
  return (
    <div className="App">
      {/* <Header />
      <Input placeholder="standard" variant="standard" />
      <AddStudent /> */}
      <AdminPage />
    </div>
  );
}

export default App;
