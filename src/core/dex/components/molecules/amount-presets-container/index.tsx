import { PercentPressableContainer, RowContainer } from '@components/atoms';
import { BASE_PERCENTS_PRESET } from '@constants';
import { styles } from './styles';

interface AmountPresetsContainerProps {
  onPresetPress: (
    payload: (typeof BASE_PERCENTS_PRESET)[number] | number
  ) => void;
  disabled?: boolean;
}

export const AmountPresetsContainer = ({
  onPresetPress,
  disabled
}: AmountPresetsContainerProps) => {
  return (
    <RowContainer alignItems="center" justifyContent="space-between">
      {BASE_PERCENTS_PRESET.map((preset) => (
        <PercentPressableContainer
          key={preset}
          value={preset}
          disabled={disabled}
          onPress={onPresetPress}
          style={styles.container}
          typographyStyle={styles.typography}
        />
      ))}
    </RowContainer>
  );
};
