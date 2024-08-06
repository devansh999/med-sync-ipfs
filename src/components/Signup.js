import React, { useState } from 'react';

const Signup = ({ onSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupStatus, setSignupStatus] = useState('');

  const handleSignup = async () => {
    try {
      await onSignup(username, password);
      setSignupStatus('Signup successful!');
    } catch (error) {
      console.error('Signup error:', error);
      setSignupStatus('Signup failed.');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
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
      <button onClick={handleSignup}>Sign Up</button>
      {signupStatus && <p>{signupStatus}</p>}
    </div>
  );
};

export default Signup;
