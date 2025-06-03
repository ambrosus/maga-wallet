import { useState, useEffect, useRef, useMemo } from 'react';
import { TextInput, View, LayoutChangeEvent, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { PrimaryButton } from '@components/molecules';
import { DEVICE_HEIGHT } from '@constants';
import { useKeyboardHeight } from '@lib';
import { SETTINGS_STACK_ROUTES } from '@navigation';
import { RootNavigationProp } from '@navigation/root-stack';
import { Settingsitems } from '@screens/settings/models';
import { AddContactTemplate } from './components';
import { styles } from './styles';
export const AddContactForm = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<RootNavigationProp>();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [memo, setMemo] = useState('');
  const keyboardHeight = useKeyboardHeight();
  const [inputsBottom, setInputsBottom] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const buttonBottom = useSharedValue(0);

  const addressRef = useRef<TextInput>(null);
  const memoRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!keyboardHeight) {
      buttonBottom.value = withTiming(0, { duration: 250 });
      return;
    }
    const available = containerHeight - inputsBottom - DEVICE_HEIGHT * 0.05;
    buttonBottom.value = withTiming(available, { duration: 250 });
  }, [keyboardHeight, inputsBottom, containerHeight, buttonBottom]);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    ...styles.buttonContainer,
    bottom: buttonBottom.value
  }));

  const onInputsLayout = (e: LayoutChangeEvent) => {
    const { y, height } = e.nativeEvent.layout;
    setInputsBottom(y + height);
  };
  const onContainerLayout = (e: LayoutChangeEvent) => {
    setContainerHeight(e.nativeEvent.layout.height);
  };

  const submitNewContact = async () => {
    try {
      // TODO: Implement contact creation
      setName('');
      setAddress('');
      setMemo('');
      Keyboard.dismiss();

      navigation.navigate(SETTINGS_STACK_ROUTES.AddressBookScreen, {
        name: Settingsitems.AddressBook
      });
    } catch {
      // TODO: Implement proper error handling
    }
  };

  const isButtonDisavled = useMemo(() => {
    return !name || !address;
  }, [name, address]);

  return (
    <View style={styles.main} onLayout={onContainerLayout}>
      <View style={styles.root} onLayout={onInputsLayout}>
        {/* Name */}
        <AddContactTemplate
          value={name}
          setValue={setName}
          placeholder={t('settings.address.book.contact.name.placeholder')}
          label={t('settings.address.book.contact.name')}
          ref={null}
          returnKeyType="next"
          onSubmitEditing={() => addressRef.current?.focus()}
        />
        {/* Wallet address */}
        <AddContactTemplate
          value={address}
          setValue={setAddress}
          placeholder={t('settings.address.book.contact.address.placeholder')}
          label={t('settings.address.book.contact.address')}
          ref={addressRef as React.RefObject<TextInput>}
          returnKeyType="next"
          onSubmitEditing={() => memoRef.current?.focus()}
        />
        {/* Memo */}
        <AddContactTemplate
          value={memo}
          setValue={setMemo}
          placeholder={t('settings.address.book.contact.memo.placeholder')}
          label={t('settings.address.book.contact.memo')}
          ref={memoRef as React.RefObject<TextInput>}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />
      </View>
      <Animated.View style={animatedButtonStyle} pointerEvents="box-none">
        <PrimaryButton
          disabled={isButtonDisavled}
          title={t('settings.address.book.save.contact')}
          onPress={submitNewContact}
        />
      </Animated.View>
    </View>
  );
};
