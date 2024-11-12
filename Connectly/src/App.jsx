import './App.css';
import Post from "./components/Post.jsx";
import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [feedId, setFeedId] = useState(null);
  const [currentTopicId, setCurrentTopicId] = useState(null);

  // Function to fetch JSON data
  const fetchData = async () => {
    try {
      // Replace this with your actual fetch call if hosted
      const data = {
        "posts": [
          {
            "id": 1,
            "content": "This is the first post content.",
            "createdDate": "2023-11-10T15:23:00Z",
            "user": {
              "userId": 101,
              "username": "johndoe"
            }
          },
          {
            "id": 2,
            "content": "Here is another interesting post.",
            "createdDate": "2023-11-11T10:05:00Z",
            "user": {
              "userId": 102,
              "username": "janedoe"
            }
          },
          {
            "id": 3,
            "content": "Loving the discussions here!",
            "createdDate": "2023-11-12T09:00:00Z",
            "user": {
              "userId": 103,
              "username": "alice"
            }
          }
        ],
        "loggedInUserData": {
          "userId": 101,
          "username": "johndoe"
        },
        "feedId": 5,
        "currentTopicId": 2
      };

      setPosts(data.posts);
      setLoggedInUserData(data.loggedInUserData);
      setFeedId(data.feedId);
      setCurrentTopicId(data.currentTopicId);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Load data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
      <>
        <Post
            posts={posts}
            setPosts={setPosts}
            feedId={feedId}
            setTopicId={setCurrentTopicId}
            loggedInUser={loggedInUserData}
        />
      </>
  );
}

export default App;
