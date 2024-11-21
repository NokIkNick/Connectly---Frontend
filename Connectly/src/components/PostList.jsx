import React from "react";

export default function PostList({posts}){
    return (
        <ul>
            {posts.map((post => (
                <li>
                    <h3>{post.title}</h3>
                    <p><strong>Date Created:</strong>{post.date_created}</p>
                    <p>{post.content}</p>
                </li>
            )))}
        </ul>
    )
}