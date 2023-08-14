import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MessageDashboard from "./components/MessageDashboard";
import Login from "./components/Login"

function App() {
  const [agentData, setagentData] = useState();
  const loginHandler = (data) =>{
    setagentData(data);
  }

  useEffect(() => {
    console.log("Re-render");
  }, [setagentData]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              agentData ? (
                <MessageDashboard agentData={agentData} setagentData={setagentData}/>
              ) : (
                <Login agentData={agentData} loginHandler={loginHandler} />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
