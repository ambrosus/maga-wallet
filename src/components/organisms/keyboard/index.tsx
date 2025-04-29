import { ReactElement } from 'react';
import {
  TextStyle,
  TouchableOpacity,
  Vibration,
  View,
  ViewStyle
} from 'react-native';
import { RowContainer, Typography } from '@components/atoms';
import { Arow } from '@components/svgs';
import { COLORS } from '@constants';
import { styles } from './styles';

const DEFAULT_BUTTONS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  [' ', '0', 'remove']
];

interface KeyboardModel {
  buttons?: string[][];
  customBackSpaceIcon?: ReactElement;
  buttonContainerStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  onRemove: () => void;
  onButtonPress: (btnTitle: string) => void;
}

export const Keyboard = ({
  buttons = DEFAULT_BUTTONS,
  buttonContainerStyle,
  buttonTextStyle,
  onButtonPress,
  onRemove
}: KeyboardModel) => {
  const getButtonFunction = (btnTitle: string) => {
    switch (btnTitle) {
      case 'remove':
        return { title: btnTitle, onPress: onRemove };
      default:
        return {
          title: btnTitle,
          onPress: () => onButtonPress(btnTitle)
        };
    }
  };

  const RenderButton = ({ button }: { button: string }) => {
    if (!button) return <></>;
    const { title, onPress } = getButtonFunction(button);

    const isNeedIcon = title === 'remove';

    const onButtonPress = () => {
      onPress();
      Vibration.vibrate(30);
    };

    return (
      <TouchableOpacity
        onPress={onButtonPress}
        disabled={!title}
        style={{
          ...styles.container,
          ...buttonContainerStyle
        }}
      >
        {isNeedIcon ? (
          <Arow color={COLORS.neutral900} scale={1.15} orientation="left" />
        ) : (
          <Typography
            style={{
              ...styles.btnText,
              ...buttonTextStyle
            }}
          >
            {title}
          </Typography>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.main}>
      {buttons.map((item, index) => {
        return (
          <RowContainer key={`${index}`}>
            {item.map((item, index) => (
              <RenderButton key={`${index}`} button={item} />
            ))}
          </RowContainer>
        );
      })}
    </View>
  );
};
