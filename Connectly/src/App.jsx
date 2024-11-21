import './App.css';
import Post from "./components/Post.jsx";
import { useEffect, useState } from "react";
import SpecificFeed from "./page/SpecificFeed.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  const [posts, setPosts] = useState([]);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [feedId, setFeedId] = useState(null);
  const [currentTopicId, setCurrentTopicId] = useState(null);

  return (
      <>
          <div>
              <BrowserRouter>
                  <Routes>
                     <Route path="/test" element={<SpecificFeed/>}/>
                  </Routes>
              </BrowserRouter>
          </div>

      </>
  );
}

export default App;
