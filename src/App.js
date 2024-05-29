import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect, useState } from "react";
import PrivateRoute from "./route/PrivateRoute";
import api from "./utils/api";

function App() {
  const [user, setUser] = useState(null)

  const getUser = async() =>{//토큰을 통해 유저정보를 가져온다.
    try{
      const storedToken = sessionStorage.getItem("token")//세션스토리지에서 토큰을 읽어옴
      if(storedToken){
        const response = await api.get('/user/me')
        setUser(response.data.user);
      }
    }catch(err){
      setUser(null)
    }
  }

  useEffect(()=>{
    getUser()
  },[])

  return (
    <Routes>
      <Route path="/" element={
        <PrivateRoute user={user}>
          <TodoPage setUser={setUser}/>
        </PrivateRoute>
      } />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/login" element={<LoginPage user={user} setUser={setUser} />} />
    </Routes>
  );
}

export default App;
