import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, States, CreateGroup } from "./screens";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/states" element={<States />} />
          <Route path="/create-group" element={<CreateGroup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
