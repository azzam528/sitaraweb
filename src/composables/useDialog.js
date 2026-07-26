import { ref } from 'vue';

export function useDialog() {
  const isOpen = ref(false);
  const title = ref('');
  const message = ref('');
  const confirmText = ref('Ya');
  const cancelText = ref('Batal');
  let onConfirmCallback = null;

  const openDialog = (options = {}) => {
    title.value = options.title || 'Konfirmasi';
    message.value = options.message || 'Apakah Anda yakin?';
    confirmText.value = options.confirmText || 'Ya';
    cancelText.value = options.cancelText || 'Batal';
    onConfirmCallback = options.onConfirm || null;
    isOpen.value = true;
  };

  const closeDialog = () => {
    isOpen.value = false;
    onConfirmCallback = null;
  };

  const confirm = () => {
    if (onConfirmCallback) {
      onConfirmCallback();
    }
    closeDialog();
  };

  return {
    isOpen,
    title,
    message,
    confirmText,
    cancelText,
    openDialog,
    closeDialog,
    confirm
  };
}
