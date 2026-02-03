export interface ToastModel {
  id: string;
  message: string;
  onClose: () => void;
  duration?: number;
}