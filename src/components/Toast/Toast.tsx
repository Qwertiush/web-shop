import { useEffect, useState } from "react";
import styles from "./Toast.module.scss";

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose, duration = 4000 }) => {
  const [state, setState] = useState<'enter' | 'exit'>('enter');
  const animationDuration = 1000;
  const time2ActivateClosingAnimation = duration - animationDuration;

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setState('exit');
      setTimeout(onClose, animationDuration);
    }, time2ActivateClosingAnimation);

    return () => clearTimeout(timer);
  }, [time2ActivateClosingAnimation, onClose]);

  const handleClose = () => {
    setState('exit');
    setTimeout(onClose, animationDuration);
  };

  return (
    <div className={`${styles.toast} ${styles[state]}`}>
      <span className={styles.toastMessage}>{message}</span>
      <button className={styles.toastClose} onClick={handleClose}>
        ✕
      </button>
    </div>
  );
};
