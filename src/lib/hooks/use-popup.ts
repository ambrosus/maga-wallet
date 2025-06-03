import { useState } from 'react';

export const usePopup = () => {
  const [visible, setVisible] = useState(false);

  const present = () => setVisible(true);
  const dismiss = () => setVisible(false);

  return {
    visible,
    present,
    dismiss
  };
};
