import React, { useState } from 'react';
import { addDataToIPFS, getDataFromIPFS } from '../services/IPFSService';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ipfsHash, setIpfsHash] = useState('');

  const handleSignup = async () => {
    try {
      const userData = { username, password };
      const hash = await addDataToIPFS(userData);
      setIpfsHash(hash);
      console.log('IPFS Hash:', hash);

      // Optionally, fetch the data back to verify
      const fetchedData = await getDataFromIPFS(hash);
      console.log('Fetched Data:', fetchedData);
    } catch (error) {
      console.error('Signup error:', error);
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
      {ipfsHash && <p>IPFS Hash: {ipfsHash}</p>}
    </div>
  );
};

export default Signup;
