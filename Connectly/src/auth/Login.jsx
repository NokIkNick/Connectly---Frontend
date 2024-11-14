import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Form = styled.form`
  background-color: white;
  padding: 3.125em;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 5px 5px 15px -1px rgba(0, 0, 0, 0.75);
`;

const Label = styled.label`
  color: rgb(77, 75, 75);
  text-transform: uppercase;
  letter-spacing: 2px;
  display: block;
  font-weight: bold;
  font-size: x-large;
  margin-bottom: 0.5em;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 1.25em;
  height: 40px;
  border-radius: 5px;
  border: 1px solid gray;
  padding: 0.3em;
  font-family: 'Inter', sans-serif;
  outline: none;
`;

const Error = styled.p`
  color: red;
`;

const Btn = styled.button`
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 auto; /* Center the button */
  display: block;
  &:hover {
    background-color: #0056b3;
  }
`;

const SignUpContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1em;
`;

const SignUpText = styled.p`
  margin-right: 10px;
  color: gray;
  font-size: 14px;
`;

const SignUpBtn = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const Div = styled.div`
  width: 500px;
  min-height: 570px;
  margin: 100px auto;
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use navigate for routing

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in both fields.');
    } else {
      setError('');
      console.log('Username:', username);
      console.log('Password:', password);
      // Perform login action, e.g., API call here
    }
  };

  const handleSignUp = () => {
    // Redirect to the /signup route
    navigate('/signup');
  };

  return (
    <Div>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Error>{error}</Error>}
        <Btn type="submit">Login</Btn>
        <SignUpContainer>
          <SignUpText>Don't have an account?</SignUpText>
          <SignUpBtn type="button" onClick={handleSignUp}>
            Sign Up
          </SignUpBtn>
        </SignUpContainer>
      </Form>
    </Div>
  );
};

export default Login;
