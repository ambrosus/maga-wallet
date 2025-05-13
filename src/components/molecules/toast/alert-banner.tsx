import { View } from 'react-native';
import { RowContainer, Spacer, Typography } from '@components/atoms';
import { CheckboxCircle, InfoIcon } from '@components/svgs';
import { COLORS } from '@constants';
import { scale } from '@utils';
import { styles } from './styles';
import { ToastOptions, ToastType } from './types';

export const AlertBanner = (props: Pick<ToastOptions, 'text' | 'type'>) => {
  const { text, type } = props;
  const isFailed = type === ToastType.Failed;

  const icon = () => {
    if (isFailed) {
      return <InfoIcon scale={0.3} />;
    }

    return <CheckboxCircle color={COLORS.success500} scale={1.4} />;
  };

  return (
    <View style={styles.containerStyle}>
      <RowContainer justifyContent="center" alignItems="center">
        {icon()}
        <Spacer horizontal value={scale(5)} />
        <Typography align="center" fontSize={16} color={COLORS.textPrimary}>
          {text}
        </Typography>
      </RowContainer>
    </View>
  );
};
