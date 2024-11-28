import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import  Searchsite  from './page/Searchsite';
import Register from './page/Register';
import  Home  from './page/Home';
import { Mainpage } from './page/mainpage';
import { Messages } from './page/messages';
import { TokenValidator } from './components/TokenValidator';



function App() {
  const [loggedInUser, setLoggedInUser] = useState({"username": "", "roles": "", "email": ""});
  const [tokenIsValid, setTokenIsValid] = useState(false);

  useEffect(() => {
    validateToken();
},[]);


  const validateToken = () => {
    
    let token = localStorage.getItem("token");
    if(token === null || token === undefined || token === ""){
      setTokenIsValid(false);
      console.log("No token found")
      return;
    }

    let tokenData;
    try {
      tokenData = JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error("Invalid token format", error);
      setTokenIsValid(false);
      localStorage.removeItem("token");
      return;
    }
    
    if(tokenData.exp < Date.now() / 1000){
      alert("Token has expired, please log in again");
      setTokenIsValid(false);
      localStorage.removeItem("token");
      return;
    }

    setTokenIsValid(true);
    setLoggedInUser({username: tokenData.username, roles: tokenData.roles, email: tokenData.email});
    console.log("Token is valid");
  }


  return (
    <>
    
      <BrowserRouter>
        <Routes>

          <Route path="*" element={<TokenValidator tokenIsValid={tokenIsValid}>
              <Routes>
                <Route path="/home" element={<Mainpage />} />
                <Route path="/search" element={<Searchsite/>} />
                <Route path="/messages" element={<Messages />} />
              </Routes >
            </TokenValidator>}>
          </Route>

          
          <Route path="/" element={<Home />}/>
          <Route path="/signup" element={<Register />}/>
          <Route path="*" element={<h1>Not Found</h1>}/>



        </Routes> 
      </BrowserRouter>
    </>
  
)}

export default App;

