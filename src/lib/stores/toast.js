import { writable } from 'svelte/store';

const createToastStore = () => {
  const { subscribe, set } = writable(null);
  let timeoutId;

  const dismiss = () => {
    clearTimeout(timeoutId);
    set(null);
  };

  const show = (message, type = 'info', duration = 3000) => {
    dismiss(); // Clear any existing toast
    set({ message, type, duration });
    
    if (duration > 0) {
      timeoutId = setTimeout(dismiss, duration);
    }
  };

  return {
    subscribe,
    show,
    info: (message, duration) => show(message, 'info', duration),
    success: (message, duration) => show(message, 'success', duration),
    error: (message, duration) => show(message, 'error', duration),
    warning: (message, duration) => show(message, 'warning', duration),
    primary: (message, duration) => show(message, 'primary', duration),
    warningcontent: (message, duration) => show(message, 'primary', duration),
    errorcontent: (message, duration) => show(message, 'errorcontent', duration),
    successcontent: (message, duration) => show(message, 'successcontent', duration),
    dismiss
  };
};

export const toast = createToastStore();