import { ReactNode } from 'react';
import { TextStyle, View, ViewComponent, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RowContainer, Typography } from '@components/atoms';
import { Arrow, CloseIcon } from '@components/svgs';
import { COLORS } from '@constants';
import { RootNavigationProp } from '@navigation/root-stack';
import { scale } from '@utils';
import { styles } from './styles';
import { Button } from '../button';

interface HeaderProps {
  title?: string;
  goBack?: boolean | (() => void);
  bottomBorder?: boolean;
  backIconVisible?: boolean;
  titleIcon?: ViewComponent;
  titleStyle?: TextStyle;
  titlePosition?: 'left' | 'center';
  contentLeft?: ReactNode;
  contentRight?: ReactNode;
  contentCenter?: ReactNode;
  closeIconVisible?: boolean;
  style?: ViewStyle;
  leftContainerStyles?: ViewStyle;
  rightContainerStyles?: ViewStyle;
  centerContainerStyle?: ViewStyle;
}

export const Header = ({
  bottomBorder = false,
  backIconVisible = true,
  contentLeft,
  contentRight,
  contentCenter,
  title,
  closeIconVisible = false,
  titlePosition = 'center',
  style = {},
  titleStyle = {},
  leftContainerStyles = {},
  rightContainerStyles = {},
  centerContainerStyle = {},
  goBack
}: HeaderProps) => {
  const navigation = useNavigation<RootNavigationProp>();

  const handleGoBack = () => {
    if (typeof goBack === 'function') return goBack();
    navigation.goBack();
  };

  const renderTitle = () => {
    if (typeof title === 'string') {
      return (
        <Typography
          fontSize={scale(20)}
          fontFamily="Onest600SemiBold"
          fontWeight="600"
          color={COLORS.textPrimary}
          style={titleStyle}
        >
          {title}
        </Typography>
      );
    }
    return title;
  };

  const renderContentLeft = () => {
    return (
      <>
        {closeIconVisible && (
          <Button onPress={navigation.goBack}>
            <CloseIcon />
          </Button>
        )}
        {backIconVisible && (
          <Button onPress={handleGoBack}>
            <Arrow orientation="left" />
          </Button>
        )}
        {titlePosition === 'left' && (
          <View style={styles.titleOnLeft}>{renderTitle()}</View>
        )}
        {contentLeft}
      </>
    );
  };

  const renderContentCenter = () => {
    return contentCenter
      ? contentCenter
      : titlePosition === 'center' && renderTitle();
  };

  const renderContentRight = () => {
    return <>{contentRight}</>;
  };

  const combineContainerStyles = {
    ...styles.container,
    ...(bottomBorder ? styles.containerBorder : {}),
    ...style
  };

  return (
    <RowContainer
      justifyContent="space-between"
      alignItems="center"
      style={combineContainerStyles}
    >
      <RowContainer
        style={{ ...styles.left, ...leftContainerStyles }}
        alignItems="center"
      >
        {renderContentLeft()}
      </RowContainer>
      <View style={[styles.center, centerContainerStyle]}>
        {renderContentCenter()}
      </View>
      <RowContainer
        style={{ ...styles.right, ...rightContainerStyles }}
        alignItems="center"
        testID="Header_ContentRight"
      >
        {renderContentRight()}
      </RowContainer>
    </RowContainer>

    // <View style={styles.main}>
    //   {goBack && (
    //     <Button style={styles.arrowContainer} onPress={handleGoBack}>
    //       <Arow orientation="left" />
    //     </Button>
    //   )}
    //   <Typography fontSize={scale(20)} color={COLORS.textPrimary}>
    //     {title}
    //   </Typography>
    // </View>
  );
};
