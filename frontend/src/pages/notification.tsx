import { useState } from 'react';

const Notification = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Notification 1' },
    { id: 2, message: 'Notification 2' },
    { id: 3, message: 'Notification 3' },
  ]);

  const addNotification = () => {
    const newNotification = {
      id: notifications.length + 1,
      message: `Notification ${notifications.length + 1}`,
    };
    setNotifications([...notifications, newNotification]);
  };

  return (
    <div>
      <h1>Notifications</h1>
      <button onClick={addNotification}>Add Notification</button>
      <div>
        {notifications.map(notification => (
          <div key={notification.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px' }}>
            {notification.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
