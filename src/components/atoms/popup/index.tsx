import { PropsWithChildren } from 'react';
import { Modal, ModalProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

interface PopupProps extends ModalProps, PropsWithChildren {
  visible: boolean;
  onClose: () => void;
}

/**
 * use @usePopup.ts hook to manage the visibility of the popup
 */
export const Popup = ({ visible, onClose, children, ...rest }: PopupProps) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      backdropColor="rgba(145, 145, 145, 0.5)"
      onRequestClose={onClose}
      onDismiss={onClose}
      presentationStyle="overFullScreen"
      style={styles.modal}
      {...rest}
    >
      <SafeAreaView style={styles.container}>{children}</SafeAreaView>
    </Modal>
  );
};
