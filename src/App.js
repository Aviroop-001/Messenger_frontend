import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MessageDashboard from "./components/MessageDashboard";
import Login from "./components/Login"
import ClientMessage from './components/ClientMessage'
import ClientLogin from './components/ClientLogin'

function App() {
  const [agentData, setagentData] = useState();
  const [clientData, setclientData] = useState();
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
                <MessageDashboard
                  agentData={agentData}
                  setagentData={setagentData}
                />
              ) : (
                <Login agentData={agentData} loginHandler={loginHandler} />
              )
            }
          />
          <Route
            path="/client"
            element={
              clientData ? (
                <ClientMessage
                  clientData={clientData}
                  setclientData={setclientData}
                />
              ) : (
                <ClientLogin
                  setclientData={setclientData}
                />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
