import { useEffect, useState } from 'react'
import {BrowserRouter , Routes,Route} from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Leads from './pages/Leads'
import NotFoundPage from './pages/NotFoundPage'
import { jwtDecode } from "jwt-decode";
import { MyContext } from './MyContext';
import Cookies from "js-cookie";
import UserProtecter from './UserProtecter'

function App() {
  const [User, setUser] = useState({});
  
  useEffect(() => {
    const token = Cookies.get("UserToken") || "";
    try {
      if (token) {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);
        setUser(decoded);
      }
    } catch (error) {
      console.error("Token decode error:", error);
    }
  }, []); // ← run only once on mount
  return (
    <MyContext.Provider value={{User, setUser}}>
       <BrowserRouter>
       <Routes>
        <Route path='/' element={<Login/> }/>
        <Route path='/leads' element={<UserProtecter><Leads/></UserProtecter> }/>
        <Route path='*' element={<NotFoundPage/>}/>
       </Routes>
       </BrowserRouter>
    </MyContext.Provider>
  )
}

export default App
