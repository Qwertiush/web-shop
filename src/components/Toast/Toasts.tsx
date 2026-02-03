import type { ToastModel } from "../../models/ToastModel";
import { Toast } from "./Toast";
import styles from "./Toasts.module.scss";

interface ToastsProps{
    toasts: ToastModel[];
}

export const Toasts: React.FC<ToastsProps> = ({toasts}) => {
  return (
    <div className={styles.toasts}>
        {toasts.map((toast)=>{
            return (
                <Toast key={toast.id} message={toast.message} onClose={toast.onClose} duration={toast.duration}/>
            );
        })}    
    </div>
  )
}
