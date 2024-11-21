import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #fff;
`;

const Title = styled.h3`
    margin-bottom: 20px;
    text-align: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 200px;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    resize: none;
`;

const Select = styled.select`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    font-size: 14px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const CharacterCount = styled.p`
    font-size: 12px;
    color: #666;
`;

export default function NewPostForm() {
    const CHARACTER_LIMIT = 200;
    const [newPostContent, setNewPostContent] = useState('');

    const handleNewPostSubmit = async (event) => {
        event.preventDefault();
        if (newPostContent.trim()) {
            const data = await postSubmit(newPostContent);
            setPosts((prev) => [...prev, data]);
            setNewPostContent('');
        }
    };

    const handleContentChange = (e) => {
        if (e.target.value.length <= CHARACTER_LIMIT) {
            setNewPostContent(e.target.value);
        }
    };

    return (
        <Container>
            <Title>Create New Post</Title>
            <Form onSubmit={(e) => {
                e.preventDefault();
                handleNewPostSubmit(e);
            }}>
                <TextArea
                    value={newPostContent}
                    onChange={handleContentChange}
                    placeholder="Post content"
                />
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Select className="dropdown" defaultValue="">
                        <option value="friends">Friends</option>
                        <option value="family">Family</option>
                        <option value="work">Hobby</option>
                    </Select>
                    <Button type="submit">Submit Post</Button>
                    <CharacterCount>{newPostContent.length}/{CHARACTER_LIMIT} character limit</CharacterCount>
                </div>
            </Form>
        </Container>
    );
}