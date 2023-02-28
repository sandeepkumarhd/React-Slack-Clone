import Register from "./Components/auth/Register";
import Login from "./Components/auth/Login";
import General from "./Components/General/General";
import SideNavBar from "./Components/Header/SideNavbar";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [isLogin,setIsLogin] = useState(false)
  useEffect(() =>{
let user = localStorage.getItem("user")
if(user){
  setIsLogin(true)
}
  },[])
  return (
    <div>
      {isLogin && <SideNavBar />}
      <Routes>
       {!isLogin && <Route exact path="/" element={<Register />} />}
        {/* <Route path="*" element={<SideNavBar />} /> */}
        <Route exact path="/login" element={<Login />} />
        {isLogin && <Route exact path="/General" element={<General />}></Route>}
      </Routes>
    </div>
  );
}

export default App;
