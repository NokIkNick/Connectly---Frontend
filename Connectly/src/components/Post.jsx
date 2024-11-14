//code tkaken from our yapp side: https://github.com/NokIkNick/CA-3-Yapp-frontEnd/blob/main/src/components/Post.jsx
import {useEffect, useState,} from "react";
//import {useNavigate} from "react-router-dom";
import PostItem from "./PostItem.jsx";
import NewPostForm from "./NewPostForm.jsx";

export default function Post({posts, setPosts, feedId,setTopicId ,loggedInUser}) {
    const [currentFeedId, setCurrentFeedId] = useState(null);
    const [loggedInUserData, setLoggedInUserData] = useState((null));
    const [visbleReplies,setVisibleReplies] = useState(null);
    const [currentTopicId,setCurrentTopicId] = useState(null);
    const[newPostContent,setNewPostContent] = useState('');
    // const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUserData(loggedInUser);
        setCurrentFeedId(feedId);
    }, [feedId, loggedInUser]);



    /*function handleClickToUser(username)
    {
        navigate(`/user/${username}`)
    }*/

    const handleNewPostSubmit = async(event) => {
        event.preventDefault();
        if(newPostContent.trim()){
            const data = await postSubmit(newPostContent,loggedInUserData.userId,currentFeedId);
            setPosts((prev)=> [...prev,data])
            setNewPostContent('');
        }
    }

    return(<div>

        {posts && posts.map((post) =>(<PostItem
            key= {post.id}
            post ={post}
            loggedInUserData={loggedInUserData}
            feedId ={post.feedId}
            //handleClickToUser={handleClickToUser()}
        />))}

            <NewPostForm
                newPostContent={newPostContent}
                setNewPostContent={setNewPostContent}
                handleNewPostSubmit={handleNewPostSubmit}
            />
    </div>);



}