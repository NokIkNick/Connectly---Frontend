import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import  Searchsite  from './page/Searchsite';
import Register from './page/Register';
import  Home  from './page/Home';
import { Mainpage } from './page/mainpage';
import { Messages } from './page/messages';
import { TokenValidator } from './components/TokenValidator';
import { AppLayout } from './layout/AppLayout';



function App() {
  const [loggedInUser, setLoggedInUser] = useState({"fullName": "", "roles": "", "email": ""});
  const [tokenIsValid, setTokenIsValid] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    validateToken();
},[]);


  const validateToken = () => {
    
    /*let token = localStorage.getItem("token");
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
    } */


    setTokenIsValid(true);
    //setLoggedInUser({username: tokenData.username, roles: tokenData.roles, email: tokenData.email});
    setLoggedInUser({fullName: "Anders Jensen", roles: "defaultRole", email: "defaultEmail"});
    console.log("Token is valid");
  }

  const triggerSearch = (newSearch) => {
    console.log("Search triggered2:", newSearch);
    setSearch(newSearch);
};


  return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route element={
            <AppLayout search={search} setSearch={setSearch} triggerSearch={triggerSearch}/>
          }>
            <Route path="*" element={<TokenValidator tokenIsValid={tokenIsValid}>
                <Routes>
                  <Route path="/home" element={<Mainpage loggedInUser={loggedInUser} />} />
                  <Route path="/search" element={<Searchsite loggedInUser={loggedInUser} search={search} setSearch={setSearch} triggerSearch={triggerSearch}/>} />
                  <Route path="/messages" element={<Messages loggedInUser={loggedInUser} />} />
                </Routes >
              </TokenValidator>}>
            </Route>
          </Route>
          
          <Route path="/" element={<Home />}/>
          <Route path="/signup" element={<Register />}/>
          <Route path="*" element={<h1>Not Found</h1>}/>



        </Routes> 
      </BrowserRouter>
    </>
  
)}

export default App;

