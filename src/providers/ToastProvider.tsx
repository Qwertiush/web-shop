import { useState, type ReactNode } from "react";
import { ToastContext } from "../contexts/ToastContext";
import { Toasts } from "../components/Toast/Toasts";
import type { ToastModel } from "../models/ToastModel";

interface Props {
  children: ReactNode;
}

export const ToastProvider = ({ children }: Props) => {
  const [ toasts, setToasts ] = useState<ToastModel[]>([]);

  const toastLifeTime = 4000;
  const toastLimit = 4;

  const createNewId = () => crypto.randomUUID();

  const pushToast = (msg: string, duration?: number) => {
    if(toasts.length >= toastLimit){
      setToasts(prev => prev.slice(1));
    }

    const newToastId = createNewId();
    const newToast: ToastModel = {id: newToastId, message: msg, onClose: () => onClose(newToastId), duration: duration ?? toastLifeTime}
    console.log('Creating new toast: ' + newToast.id);

    setToasts(prev => [...prev, newToast]);
    console.log(toasts);
  }

  const onClose = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }

  return (
    <ToastContext.Provider value={{pushToast}}>
        {children}
        <Toasts toasts={toasts}/>
    </ToastContext.Provider>
  );
};