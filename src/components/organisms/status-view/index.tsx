import { PropsWithChildren, useMemo } from 'react';
import { ImageBackground, View } from 'react-native';
import { SafeViewContainer, Spacer, Typography } from '@components/atoms';
import { FontFamily } from '@components/atoms/typography/types';
import { FailedIconWrapped, SuccessIconWrapped } from '@components/svgs';
import {
  DEVICE_WIDTH,
  DEVICE_HEIGHT,
  FONT_SIZE,
  COLORS,
  FLEX_FULL_SIZE
} from '@constants';
import { styles } from './styles';

interface StatusViewProps extends PropsWithChildren {
  title: string;
  description: string;
  status: 'success' | 'error';
  descriptionComponent?: React.ReactNode;
  typographyStyle?: Partial<{
    title: Partial<{
      fontSize: number;
      fontFamily: FontFamily;
      color: string;
      letterSpacing: number;
    }>;
    description: Partial<{
      fontSize: number;
      fontFamily: FontFamily;
      color: string;
      align: 'center';
    }>;
  }>;
}

export const StatusView = ({
  title,
  description,
  status,
  descriptionComponent,
  typographyStyle = {
    title: {
      fontSize: FONT_SIZE.heading.xl,
      fontFamily: 'Onest600SemiBold',
      color: COLORS.textPrimary,
      letterSpacing: -1
    },
    description: {
      fontSize: FONT_SIZE.body.lg,
      fontFamily: 'Onest500Medium',
      color: COLORS.textPrimary,
      align: 'center'
    }
  },
  children
}: StatusViewProps) => {
  const icons = {
    success: <SuccessIconWrapped />,
    error: <FailedIconWrapped />
  } as const;

  const bgSource = useMemo(() => {
    return status === 'error'
      ? require('@assets/images/tx-failed-background.png')
      : require('@assets/images/tx-success-background.png');
  }, [status]);

  return (
    <ImageBackground
      style={FLEX_FULL_SIZE}
      width={DEVICE_WIDTH}
      height={DEVICE_HEIGHT}
      source={bgSource}
    >
      <SafeViewContainer style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.statusContainer}>
            {icons[status]}

            <Spacer value={16} />
            <Typography {...typographyStyle.title}>{title}</Typography>
            <Spacer value={8} />
            {descriptionComponent ? (
              descriptionComponent
            ) : (
              <Typography
                {...typographyStyle.description}
                style={styles.description}
              >
                {description}
              </Typography>
            )}
          </View>
        </View>

        {children}
      </SafeViewContainer>
    </ImageBackground>
  );
};
