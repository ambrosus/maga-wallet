import { TouchableOpacity } from 'react-native';
import { RowContainer, Spacer, Typography } from '@components/atoms';
import { Arrow } from '@components/svgs';
import { COLORS } from '@constants';
import { scale } from '@utils';
import { styles } from './styles';

interface HomeHeaderButtonProps {
  onPress: () => void;
  title: string;
}

export const HomeHeaderButton = ({ onPress, title }: HomeHeaderButtonProps) => {
  const _title = title.length > 10 ? `${title.slice(0, 7)}...` : title;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <RowContainer justifyContent="space-between" alignItems="center">
        <Typography color={COLORS.textPrimary}>{_title}</Typography>
        <Spacer horizontal value={scale(10)} />
        <Arrow color={COLORS.black} orientation="down" />
      </RowContainer>
    </TouchableOpacity>
  );
};
