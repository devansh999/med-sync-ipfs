import React, { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import { addDataToIPFS, getDataFromIPFS } from './services/IPFSService';
import bcrypt from 'bcryptjs';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState({});
  const [ipfsHash, setIpfsHash] = useState('');

  const handleSignup = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };
    const updatedUsers = { ...users, [username]: newUser };
    setUsers(updatedUsers);

    const cid = await addDataToIPFS(updatedUsers);
    setIpfsHash(cid);
  };

  const handleLogin = async (username, password) => {
    if (!username || !password) {
      alert('Username and password are required');
      return;
    }

    try {
      const storedUsers = await getDataFromIPFS(ipfsHash);
      const user = storedUsers[username];

      if (user && await bcrypt.compare(password, user.password)) {
        setCurrentUser(user);
      } else {
        alert('Invalid username or password');
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
