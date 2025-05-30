import { View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useTranslation } from 'react-i18next';
import { Typography, Spacer } from '@components/atoms';
import { CopyButton, Toast, ToastType } from '@components/molecules';
import { CopyIcon } from '@components/svgs';
import { COLORS } from '@constants';
import { scale } from '@utils';
import { styles } from './styles';

interface UserInfoContainerProps {
  title: string;
  data: string;
}

export const UserInfoContainer = ({ title, data }: UserInfoContainerProps) => {
  const { t } = useTranslation();

  const onPress = () => {
    Clipboard.setString(data);
    Toast.show({
      text: t('common.copied'),
      type: ToastType.Success
    });
  };

  return (
    <View style={styles.container}>
      <Typography fontSize={scale(14)} fontWeight="500">
        {title}
      </Typography>
      <Spacer value={scale(4)} />
      <View style={styles.dataRow}>
        <Typography
          color={COLORS.textPrimary}
          fontSize={scale(14)}
          fontWeight="500"
        >
          {data}
        </Typography>
        <CopyButton onCopyPress={onPress} valueToCopy={data}>
          <View style={styles.copyButton}>
            <CopyIcon />
          </View>
        </CopyButton>
      </View>
    </View>
  );
};
