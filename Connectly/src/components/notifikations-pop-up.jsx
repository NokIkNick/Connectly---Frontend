import React, { useState } from 'react';

const NotifikationsPopUp = ({ notifications }) => {
  const [visible, setVisible] = useState(true);

  const handleAccept = (id) => {
    console.log(`Accepted notification with id: ${id}`);
  };

  const handleReject = (id) => {
    console.log(`Rejected notification with id: ${id}`);
  };

  const styles = {
    popup: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '300px',
      backgroundColor: 'white',
      border: '1px solid #ccc',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      zIndex: 1000,
    },
    ul: {
      listStyle: 'none',
      padding: 0,
    },
    li: {
      marginBottom: '10px',
    },
    button: {
      marginRight: '5px',
    },
    closeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: 'none',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
    },
  };

  return (
    visible && (
      <div style={styles.popup}>
        <button style={styles.closeButton} onClick={() => setVisible(false)}>X</button>
        <ul style={styles.ul}>
          {notifications.map((notification) => (
            <li key={notification.id} style={styles.li}>
              <p>{notification.message}</p>
              <button style={styles.button} onClick={() => handleAccept(notification.id)}>Accept</button>
              <button style={styles.button} onClick={() => handleReject(notification.id)}>Reject</button>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default NotifikationsPopUp;