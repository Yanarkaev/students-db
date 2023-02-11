import { Header } from "./components";
import { Input } from "./components/iu";
import Auth from "./features/auth-page/Auth";

function App() {
  return (
    <div className="App">
      {/* <Header />
      <Input placeholder="standard" variant="standard" /> */}
      <Auth />
    </div>
  );
}

export default App;
