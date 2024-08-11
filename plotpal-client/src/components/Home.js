import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Title, Button } from './StyledComponents';
import axios from 'axios';

const FileInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  display: inline-block;
  padding: 10px 15px;
  background-color: #667eea;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #764ba2;
  }
`;

const ChatContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  height: 300px;
  overflow-y: auto;
`;

const ChatInput = styled.input`
  width: 70%;
  padding: 10px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
`;

function Home() {
  const [file, setFile] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://your-backend-url/upload', formData);
      alert('File uploaded successfully!');
      // Here you might want to trigger the chat window to open
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file.');
    }
  };

  const handleAskQuestion = async () => {
    if (!question) return;

    // Add user's question to chat history
    setChatHistory([...chatHistory, { type: 'user', text: question }]);

    try {
      const response = await axios.post('http://your-backend-url/ask', { question });
      setChatHistory([...chatHistory, { type: 'user', text: question }, { type: 'bot', text: response.data.answer }]);
    } catch (error) {
      console.error('Error asking question:', error);
      setChatHistory([...chatHistory, { type: 'user', text: question }, { type: 'bot', text: 'Sorry, I encountered an error.' }]);
    }

    setQuestion('');
  };

  return (
    <Container>
      <Title>PlotPal Home</Title>
      <FileLabel>
        Choose PDF
        <FileInput type="file" onChange={handleFileChange} accept=".pdf" />
      </FileLabel>
      {file && (
        <div>
          <p>Selected file: {file.name}</p>
          <Button onClick={handleFileUpload}>Upload PDF</Button>
        </div>
      )}
      <ChatContainer>
        {chatHistory.map((message, index) => (
          <p key={index}><strong>{message.type === 'user' ? 'You:' : 'PlotPal:'}</strong> {message.text}</p>
        ))}
      </ChatContainer>
      <div>
        <ChatInput
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
        />
        <Button onClick={handleAskQuestion}>Ask</Button>
      </div>
    </Container>
  );
}

export default Home;