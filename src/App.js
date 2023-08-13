import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MessageDashboard from "./components/MessageDashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MessageDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
