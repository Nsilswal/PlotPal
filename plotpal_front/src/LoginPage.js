import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const LoginPage = () => {
  const handleLoginSuccess = (tokenResponse) => {
    const { credential } = tokenResponse;
    console.log('Login Success:', credential);

    axios.post('http://localhost:5000/callback', { token: credential })
      .then(response => {
        console.log('Google login success', response.data);
        // Handle successful login here (e.g., store token, redirect)
        // For example:
        // localStorage.setItem('user', JSON.stringify(response.data));
        // window.location.href = '/dashboard';
      })
      .catch(error => {
        console.error('Google login error:', error);
      });
  };

  const handleLoginFailure = (error) => {
    console.error('Login Failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId={"201155962894-du8i9fnjhibska7jtd7bo8ds8gf5k9so.apps.googleusercontent.com"}>
      <div className="login-page">
        <h2>Login</h2>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
          useOneTap
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
