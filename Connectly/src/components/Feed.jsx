import Post from "./Post.jsx";
import {useNavigate} from "react-router-dom";
export default function Feed(feedData,SetFeedData,posts,setPosts){

    const navigate = useNavigate();

    return(
        <div>
            <div>

            </div>
            <br/>
            <Post posts={posts} setPosts={setPosts} />
        </div>
    )
}