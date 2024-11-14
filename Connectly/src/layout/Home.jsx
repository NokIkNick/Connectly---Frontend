import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Login from '../auth/login'; // Import the Login component

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
`;

const WelcomeSection = styled.div`
  flex: 1;
  padding-right: 20px;
  max-width: 50%;
  text-align: left;
`;

const LoginSection = styled.div`
  width: 400px;
  padding-left: 20px;
  max-width: 50%;
`;

const Home = () => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText =
    "Welcome to Connectly! Connectly is a platform designed to help you connect with the people who matter most in your life. Whether it's family, work, friends, or the public, you can easily categorize your connections into four groups, giving you full control over who sees your posts. Share your thoughts, updates, and moments with the right people, at the right time. Stay connected, stay in control – with Connectly!";

  useEffect(() => {
    let index = 0;
    let timer;

    // Function to add one character at a time
    const typeWriterEffect = () => {
      if (index < fullText.length) {
        setDisplayedText((prevText) => prevText + fullText.charAt(index));
        index++;
        timer = setTimeout(typeWriterEffect, 50); // Adjust the speed here (50ms per character)
      }
    };

    typeWriterEffect(); // Start the typing effect

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <WelcomeSection>
        <h1>Welcome to Connectly!</h1>
        <p>{displayedText}</p>
      </WelcomeSection>

      <LoginSection>
        <Login />
      </LoginSection>
    </Container>
  );
};

export default Home;
