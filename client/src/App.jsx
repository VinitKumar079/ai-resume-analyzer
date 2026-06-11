import {
  Routes,
  Route,
} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import History from "./pages/History";

function App() {

  return (

    <Routes>

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/history"
        element={<History />}
      />

    </Routes>

  );

}

export default App;