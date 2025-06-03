import { useMemo } from 'react';
import { DimensionValue, View } from 'react-native';
import { isSmallScreen } from '@utils';
import { styles } from './styles';

interface CameraSquareProps {
  readonly height?: DimensionValue;
}

export const CameraSquare = ({
  height = isSmallScreen ? '60%' : '70%'
}: CameraSquareProps) => {
  const containerStyle = useMemo(
    () => ({
      ...styles.container,
      height
    }),
    [height]
  );

  return (
    <View style={containerStyle}>
      <View style={styles.innerContainer}>
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />
      </View>
    </View>
  );
};
