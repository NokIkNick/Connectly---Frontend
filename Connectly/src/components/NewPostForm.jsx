import React from "react";

export default function NewPostForm({ newPostContent, setNewPostContent, handleNewPostSubmit }) {
    return (
        <div>
            <h3>Create New Post</h3>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleNewPostSubmit(e);
            }}>
                <p
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Post content"
                />
                <button type="submit">Submit Post</button>
            </form>
        </div>
    );
}