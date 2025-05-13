import { RowContainer, Spinner, Spacer, Typography } from '@components/atoms';
import { FontFamily } from '@components/atoms/typography/types';
import { COLORS } from '@constants';
import { scale } from '@utils';

interface TextOrSpinnerProps {
  loading: boolean;
  loadingLabel?: string;
  label: string;
  spinnerColor?: string;
  spinnerCustomSize?: number;
  spinnerSize?: 'large' | 'small' | 'xs';
  styles?: Partial<{
    loading: Partial<{
      fontSize: number;
      fontFamily: FontFamily;
      color: string;
    }>;
    active: Partial<{
      fontSize: number;
      fontFamily: FontFamily;
      color: string;
    }>;
  }>;
}

export const TextOrSpinner = ({
  loading,
  loadingLabel,
  label,
  spinnerColor,
  spinnerCustomSize,
  spinnerSize = 'xs',
  styles = {
    loading: {
      fontSize: 16,
      fontFamily: 'Onest600SemiBold',
      color: COLORS.primary600
    },
    active: {
      fontSize: 16,
      fontFamily: 'Onest600SemiBold',
      color: loading ? COLORS.primary100 : COLORS.white
    }
  }
}: TextOrSpinnerProps) => {
  return (
    <>
      {loading ? (
        <RowContainer alignItems="center">
          <Spinner
            customSize={spinnerCustomSize}
            color={spinnerColor}
            size={spinnerSize}
          />
          {loadingLabel && (
            <>
              <Spacer horizontal value={scale(8)} />
              <Typography
                fontSize={styles.loading?.fontSize}
                fontFamily={styles.loading?.fontFamily}
                color={styles.loading?.color}
              >
                {loadingLabel}
              </Typography>
            </>
          )}
        </RowContainer>
      ) : (
        <Typography
          fontSize={styles.active?.fontSize}
          fontFamily={styles.active?.fontFamily}
          color={styles.active?.color}
        >
          {label}
        </Typography>
      )}
    </>
  );
};
