import { ToastContainer, toast } from 'react-toastify';
import { useEvent } from './useEvent';

export const Notifications = () => {
  useEvent('notify', ({ type, message }) => {
    toast(message, { type });
  });

  return <ToastContainer position="bottom-right" />;
};
