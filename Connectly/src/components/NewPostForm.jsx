import React from "react";



export default function NewPostForm({ newPostContent, setNewPostContent, handleNewPostSubmit }) {
    return (
        <div>
            <h3>Create New Post</h3>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleNewPostSubmit(e);
            }}>
                <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Post content"
                />


                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

                    <select className="dropdown" defaultValue="">
                        <option value="friends">Friends</option>
                        <option value="family">Family</option>
                        <option value="work">Hobby</option>
                    </select>

                    <button type="submit">Submit Post</button>
                </div>
            </form>
        </div>
    );
}