import { FilterBar, Header } from "./components";
import { Input } from "./components/iu";
import AddStudent from "./features/students/add-student/AddStudent";
import { useStudents } from "./shared/hooks/useStudents";
import Auth from "./features/auth-page/Auth";
import { Table } from "./components/iu/Table/Table";

function App() {
  const [students, loading, error] = useStudents();
  const columns = [{ value: "department", displayValue: "Университет" }];

  console.log(students, loading, error);
  return (
    <div className="App">
      <Input placeholder="standard" variant="standard" />
      <AddStudent />
      <Table columns={columns} rows={students} />
    </div>
  );
}

export default App;
