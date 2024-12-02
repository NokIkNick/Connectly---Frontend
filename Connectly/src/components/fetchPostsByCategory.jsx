import React, { useState } from 'react';
import { fetchPostsByCategory } from '../services/apiFacade';

const FetchPostsByCategory = () => {
    const [posts, setPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const categories = ['family', 'friends', 'work']; 
    const handleCategoryClick = async (category) => {
        setSelectedCategory(category);
        try {
            const data = await fetchPostsByCategory(category);
            setPosts(data);
        } catch (error) {
            console.error('Failed to load posts by category:', error);
        }
    };

    return (
        <div>
            <div>
                {categories.map((category) => (
                    <button key={category} onClick={() => handleCategoryClick(category)}>
                        {category}
                    </button>
                ))}
            </div>
            <div>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id}>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                        </div>
                    ))
                ) : (
                    <p>No post</p>
                )}
            </div>
        </div>
    );
};

export default FetchPostsByCategory;