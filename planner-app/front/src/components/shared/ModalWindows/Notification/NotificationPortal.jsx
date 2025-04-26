import ReactDOM from 'react-dom';
import {useState} from "react";
import styles from "./notification.module.css";
import { useNotificationStore } from '@/store/zustand/UserModalWindow/userModalController';

const notifyRoot = document.getElementById("notification-root");

const NotificationPortal = () => {
  const notifications = useNotificationStore((s) => s.notifications);
    if(!notifications) return;  

  return ReactDOM.createPortal(
        <div className={styles.toastContainer}>
            <div key={notifications.id} className={styles.toast}>
                {notifications.message}
            </div>
        </div>,
    notifyRoot
  );
};

export default NotificationPortal;

