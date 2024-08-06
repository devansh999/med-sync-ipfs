import React, { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import { addDataToIPFS, getDataFromIPFS } from './services/IPFSService';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState({});
  const [ipfsHash, setIpfsHash] = useState('');

  const handleSignup = async (username, password) => {
    const newUser = { username, password };
    const updatedUsers = { ...users, [username]: newUser };
    setUsers(updatedUsers);

    const cid = await addDataToIPFS(updatedUsers);
    console.log("Data stored in IPFS with CID:", cid);
    setIpfsHash(cid);
  };

  const handleLogin = async (username, password) => {
    if (!ipfsHash) {
      alert('No users registered yet.');
      return;
    }

    try {
      const storedUsers = await getDataFromIPFS(ipfsHash);
      console.log("Stored users fetched from IPFS:", storedUsers);
      const user = storedUsers[username];

      if (user && user.password === password) {
        setCurrentUser(user);
        console.log("Login successful:", user);
      } else {
        alert('Invalid username or password');
        console.log("Login failed: Invalid username or password");
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };

  return (
    <div>
      {currentUser ? (
        <h2>Welcome, {currentUser.username}!</h2>
      ) : (
        <div>
          <Signup onSignup={handleSignup} />
          <Login onLogin={handleLogin} />
        </div>
      )}
    </div>
  );
}

export default App;
