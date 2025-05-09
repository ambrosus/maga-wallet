import { Typography } from '@components';
import { Button } from '@components/molecules';
import { COLORS } from '@constants';
import { styles } from './styles';

interface PercentPressableContainerProps {
  percentage: number;
  onPress: (percentage: number) => void;
}

export const PercentPressableContainer = ({
  percentage,
  onPress
}: PercentPressableContainerProps) => {
  return (
    <Button onPress={() => onPress(percentage)} style={styles.percentageBox}>
      <Typography
        fontSize={16}
        fontFamily="Onest500Medium"
        color={COLORS.neutral800}
      >
        {percentage}%
      </Typography>
    </Button>
  );
};
