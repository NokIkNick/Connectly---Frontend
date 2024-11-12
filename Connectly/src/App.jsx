import React, { useState, useEffect } from 'react';
import NotifikationsPopUp from './components/notifikations-pop-up';

const App = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [inputUserId, setInputUserId] = useState("");
  const [visible, setVisible] = useState(true); // Synlighed af pop-up

  useEffect(() => {
    fetch('/notifications.json')
      .then(response => response.json())
      .then(data => setNotifications(data))
      .catch(error => console.error('Error fetching notifications:', error));
  }, []);


  useEffect(() => {
    if (selectedUserId !== null) {
      setVisible(true);
    }
  }, [selectedUserId]);

  const handleUserIdConfirm = () => {
    setSelectedUserId(Number(inputUserId));
  };

  const filteredNotifications = selectedUserId
    ? notifications.filter(notification => notification.user_id === selectedUserId)
    : notifications;

  return (
    <div>
      <h1>Notification Pop-Up Test</h1>
      <input
        type="number"
        placeholder="Enter user ID"
        value={inputUserId}
        onChange={(e) => setInputUserId(e.target.value)}
      />
      <button onClick={handleUserIdConfirm}>Confirm User ID</button>
      <NotifikationsPopUp 
        key={selectedUserId}
        notifications={filteredNotifications} 
        visible={visible} 
        setVisible={setVisible}
      />
    </div>
  );
};

export default App;
