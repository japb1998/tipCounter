import logo from "./logo.svg";
import "./App.css";
import Bar from "./components/NavBar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import { tokenInterceptor } from "./utils/auth";
import ProtectedRoute from "./components/ProtectedRoute";
tokenInterceptor();

function App() {
  return (
    <Router>
      <Bar></Bar>
      <Switch>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/signup">
          <Signup></Signup>
        </Route>
        <ProtectedRoute
          path="/dashboard"
          component={Dashboard}
        ></ProtectedRoute>
      </Switch>
    </Router>
  );
}

export default App;
