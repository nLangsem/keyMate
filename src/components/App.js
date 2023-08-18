import React from "react"
import Signup from "./Signup"
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";

function App() {
  return (
    <Router>
    <AuthProvider>
      <Routes>
      <Route exact path="/"element={<PrivateRoute><Dashboard /></PrivateRoute>
              }>
          </Route>
      <Route path="/update-profile"element={<PrivateRoute><UpdateProfile /></PrivateRoute>
              }>
      </Route>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
      </Routes>
    </AuthProvider>
    </Router>
    
  );
}

export default App;


