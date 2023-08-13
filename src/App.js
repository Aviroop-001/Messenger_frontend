import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import UserMessages from "./components/UserMessages";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/messages" element={<UserList />} />
          <Route exact path="/messages/:userId" element={UserMessages} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
