import { View, TextInput, ReturnKeyTypeOptions } from 'react-native';
import { Typography } from '@components/atoms';
import { COLORS } from '@constants';
import { styles } from './styles';

interface AddContactTemplateProps {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  label: string;
  returnKeyType: ReturnKeyTypeOptions;
  onSubmitEditing: () => void;
}

export const AddContactTemplate = ({
  value,
  setValue,
  placeholder,
  label,
  returnKeyType,
  onSubmitEditing
}: AddContactTemplateProps) => {
  return (
    <View style={styles.fieldWrapper}>
      <Typography color={COLORS.textPrimary} style={styles.label}>
        {label}
      </Typography>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};
