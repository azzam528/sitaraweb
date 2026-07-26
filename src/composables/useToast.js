import { ref } from 'vue';
import { generateId } from '../utils/helpers';

const toasts = ref([]);

export function useToast() {
  const addToast = ({ type = 'info', message, duration = 3000 }) => {
    const id = generateId();
    toasts.value.push({ id, type, message });

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };

  const removeToast = (id) => {
    const index = toasts.value.findIndex(t => t.id === id);
    if (index !== -1) {
      toasts.value.splice(index, 1);
    }
  };

  return {
    toasts,
    addToast,
    removeToast
  };
}
