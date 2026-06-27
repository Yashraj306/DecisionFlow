import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import CreateDecision from "./pages/CreateDecision";
import DecisionDetails from "./pages/DecisionDetails";
import EditDecision from "./pages/EditDecision";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateDecision />} />
        <Route path="/decision/:id" element={<DecisionDetails />} />
        <Route path="/edit/:id" element={<EditDecision />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;