import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Notfound from "./pages/Notfound";
// import axios from "axios";

const App = () => {
  const myId = sessionStorage.getItem("myid");
  const myRole = sessionStorage.getItem("myrole");
  const myToken = sessionStorage.getItem("mytoken");
  // const [localtoken, setLocalToken] = useState();

  // useEffect(() => {
  //   setLocalToken(JSON.parse(sessionStorage.getItem("mytoken")));
  //   axios.defaults.headers.common = { Authorization: `Bearer ${localtoken}` };
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home myToken={myToken} myId={myId} myRole={myRole} />}
        />
        <Route
          path="/profile"
          element={<Profile myToken={myToken} myId={myId} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
