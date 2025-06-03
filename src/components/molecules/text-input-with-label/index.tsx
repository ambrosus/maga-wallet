import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { InputProps, Spacer, TextInput, Typography } from '@components/atoms';
import { COLORS, FONT_SIZE } from '@constants';

interface TextInputWithLabelProps extends Omit<InputProps, 'style'> {
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

export const TextInputWithLabel = ({
  label,
  containerStyle,
  inputStyle,
  ...rest
}: TextInputWithLabelProps) => {
  return (
    <View style={containerStyle}>
      <Typography
        fontSize={FONT_SIZE.body.sm}
        fontFamily="Onest500Medium"
        color={COLORS.textPrimary}
      >
        {label}
      </Typography>
      <Spacer value={4} />
      <TextInput style={inputStyle} {...rest} />
    </View>
  );
};
