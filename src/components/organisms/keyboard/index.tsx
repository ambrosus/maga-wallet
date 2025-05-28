import { ReactElement } from 'react';
import {
  TextStyle,
  TouchableOpacity,
  Vibration,
  View,
  ViewStyle
} from 'react-native';
import { RowContainer, Typography } from '@components/atoms';
import { Arrow } from '@components/svgs';
import { COLORS, KEYBOARD_PRESETS } from '@constants';
import { styles } from './styles';

interface KeyboardModel {
  buttons?: string[][];
  customBackSpaceIcon?: ReactElement;
  buttonContainerStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  onButtonPress: (btnTitle: string) => void;
  onRemoveTap?: () => void;
  onRemovePressIn?: () => void;
  onRemovePressOut?: () => void;
  isShowDecimalsSymbol?: boolean;
}

export const Keyboard = ({
  buttons = KEYBOARD_PRESETS.DEFAULT_BUTTONS,
  buttonContainerStyle,
  buttonTextStyle,
  onButtonPress: onButtonPressProp,
  onRemoveTap,
  onRemovePressIn,
  onRemovePressOut
}: KeyboardModel) => {
  const RenderButton = ({ button }: { button: string }) => {
    const isRemoveButton = button === 'remove';
    const isSpaceButton = button.trim() === '';

    const pressHandler = (() => {
      if (isRemoveButton) return onRemoveTap;
      if (!isSpaceButton) {
        return () => {
          onButtonPressProp(button);
          Vibration.vibrate(30);
        };
      }
      return undefined;
    })();

    const pressInHandler = isRemoveButton ? onRemovePressIn : undefined;
    const pressOutHandler = isRemoveButton ? onRemovePressOut : undefined;

    if (isSpaceButton && !pressHandler) {
      return (
        <View
          style={{
            ...styles.container,
            ...buttonContainerStyle,
            opacity: 0
          }}
        />
      );
    }

    const isDisabled = !pressHandler && !pressInHandler;

    return (
      <TouchableOpacity
        onPress={() => {
          if (pressHandler) {
            pressHandler();
            if (isRemoveButton && onRemoveTap) {
              Vibration.vibrate(30);
            }
          }
        }}
        onPressIn={pressInHandler}
        onPressOut={pressOutHandler}
        delayLongPress={250}
        disabled={isDisabled}
        style={{
          ...styles.container,
          ...buttonContainerStyle
        }}
      >
        {isRemoveButton ? (
          <Arrow color={COLORS.neutral900} scale={1.15} orientation="left" />
        ) : (
          <Typography
            style={{
              ...styles.btnText,
              ...buttonTextStyle
            }}
          >
            {button}
          </Typography>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.main}>
      {buttons.map((rowItems, rowIndex) => {
        return (
          <RowContainer key={`row-${rowIndex}`}>
            {rowItems.map((buttonItem, buttonIndex) => (
              <RenderButton
                key={`button-${rowIndex}-${buttonIndex}`}
                button={buttonItem}
              />
            ))}
          </RowContainer>
        );
      })}
    </View>
  );
};
