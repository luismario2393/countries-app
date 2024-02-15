import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, States } from "./screens";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/states" element={<States />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
