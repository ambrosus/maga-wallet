import { ReactNode } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { Typography } from '@components/atoms';
import { COLORS } from '@constants';
import { scale } from '@utils';

interface CopyButtonProps {
  title?: string;
  children?: ReactNode;
  fontSize?: number;
  onCopyPress?: () => void;
  valueToCopy: string;
  titleContainerStyle?: ViewStyle;
}

export const CopyButton = ({
  title = 'copy',
  children,
  fontSize = scale(14),
  onCopyPress,
  titleContainerStyle,
  valueToCopy
}: CopyButtonProps) => {
  const onPress = () => {
    Clipboard.setString(valueToCopy);
    if (onCopyPress) {
      onCopyPress();
    }
  };

  if (children) {
    return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>;
  }

  return (
    <TouchableOpacity style={titleContainerStyle} onPress={onPress}>
      <Typography
        fontFamily="Onest500Medium"
        fontSize={fontSize}
        color={COLORS.primary500}
      >
        {title}
      </Typography>
    </TouchableOpacity>
  );
};
