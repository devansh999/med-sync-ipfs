import React, { useState } from 'react';
import Signup from './components/Signup';
import Login from './Login';
import { addDataToIPFS, getDataFromIPFS } from './services/IPFSService';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState({});
  const [ipfsHash, setIpfsHash] = useState('');

  const handleSignup = async (username, password) => {
    const newUser = { username, password };
    users[username] = newUser;
    setUsers(users);

    // Save users to IPFS
    const cid = await addDataToIPFS(users);
    setIpfsHash(cid);
  };

  const handleLogin = async (username) => {
    // Fetch users from IPFS
    const storedUsers = await getDataFromIPFS(ipfsHash);
    const user = storedUsers[username];

    if (user) {
      setCurrentUser(user);
    } else {
      alert('User not found');
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
