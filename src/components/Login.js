import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');

  const handleLogin = async () => {
    try {
      const user = await onLogin(username, password);
      if (user) {
        setLoginStatus(`Welcome, ${user.username}!`);
      } else {
        setLoginStatus('Invalid credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginStatus('Login failed.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
      {loginStatus && <p>{loginStatus}</p>}
    </div>
  );
};

export default Login;
