import React from "react";
import { formatDate } from '../services/apiFacade.js';

// stolen from https://github.com/NokIkNick/CA-3-Yapp-frontEnd/blob/main/src/components/PostItem.jsx
export default function PostItem({
                                     post,
                                     loggedInUserData,
                                     handleClickToUser
                                 }) {
    return (
        <div>
            <p>{post.content}</p>
            <div>Created Date: {formatDate(post.createdDate)}</div>
        </div>
    );
}
