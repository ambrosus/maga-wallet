import { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import { RowContainer, Spacer, Typography } from '@components/atoms';
import { COLORS } from '@constants';
import { scale } from '@utils';
import { styles } from './styles';

interface EditItemProps {
  title: string;
  textColor?: string;
  onPress: () => void;
  icon: ReactNode;
}

export const EditItem = ({
  title,
  onPress,
  icon,
  textColor = COLORS.textPrimary
}: EditItemProps) => {
  return (
    <TouchableOpacity style={styles.touchableOpacity} onPress={onPress}>
      <RowContainer
        justifyContent="flex-start"
        alignItems="center"
        style={styles.rowContainer}
      >
        {icon}
        <Spacer value={scale(16)} horizontal />
        <Typography color={textColor} fontSize={scale(16)}>
          {title}
        </Typography>
      </RowContainer>
    </TouchableOpacity>
  );
};
