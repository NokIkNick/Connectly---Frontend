import './App.css';
import Post from "./components/Post.jsx";
import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [feedId, setFeedId] = useState(null);
  const [currentTopicId, setCurrentTopicId] = useState(null);

  return (
      <>
        <Post

        />
      </>
  );
}

export default App;
