import React from 'react';
import styled from 'styled-components';

// Styled components
const RegisterForm = styled.form`
  background-color: white;
  padding: 3.125em;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: start;
  box-shadow: 5px 5px 15px -1px rgba(0, 0, 0, 0.75);
`;

const Div = styled.div`
  width: 500px;
  margin: 150px auto;
`;

const Button = styled.button`
  background-color: var(--blue);
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

const Label = styled.label`
  color: var(--grey); 
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
  padding-left: 5px;
`;

const Register = () => {
  return (
    <Div>
      <RegisterForm>
        <Label>Email</Label>
        <Input type="email" name="username" placeholder="Enter Username" required />

        <Label>Password</Label>
        <Input type="password" name="password" placeholder="Enter password" required />
        <Button type="submit">Register</Button>
      </RegisterForm>
    </Div>
  );
};

export default Register;
