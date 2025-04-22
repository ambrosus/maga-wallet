import { render } from '@testing-library/react-native';
import { COLORS, FONTS } from '@constants';
import { DEFAULT_FONT_SIZE, fontSizeMapping } from '@constants/ui/typography';
import { Typography } from '../index';

describe('Typography | Unit Test (Component)', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<Typography>Test Text</Typography>);
    const textElement = getByText('Test Text');

    expect(textElement).toBeDefined();
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fontFamily: FONTS.Onest500Medium,
          color: COLORS.neutral500,
          textAlign: 'auto',
          opacity: 1,
          letterSpacing: 0,
          fontSize: DEFAULT_FONT_SIZE,
          fontWeight: '400'
        }),
        undefined
      ])
    );
  });

  it('applies custom color and fontSize', () => {
    const { getByText } = render(
      <Typography color={COLORS.primary500} fontSize={20}>
        Custom Text
      </Typography>
    );

    const textElement = getByText('Custom Text');

    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          color: COLORS.primary500,
          fontSize: 20
        }),
        undefined
      ])
    );
  });

  it('applies font size based on font size key', () => {
    const { getByText } = render(<Typography title>Title Text</Typography>);

    const textElement = getByText('Title Text');

    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fontSize: fontSizeMapping.title
        }),
        undefined
      ])
    );
  });

  it('prioritizes explicit fontSize over font size keys', () => {
    const { getByText } = render(
      <Typography fontSize={24} title>
        Title Text
      </Typography>
    );

    const textElement = getByText('Title Text');

    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fontSize: 24
        }),
        undefined
      ])
    );
  });

  it('applies custom fontWeight', () => {
    const { getByText } = render(
      <Typography fontWeight="bold">Bold Text</Typography>
    );

    const textElement = getByText('Bold Text');

    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fontWeight: '700'
        }),
        undefined
      ])
    );
  });

  it('applies custom fontFamily', () => {
    const { getByText } = render(
      <Typography fontFamily="Onset600SemiBold">Custom Font</Typography>
    );

    const textElement = getByText('Custom Font');

    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fontFamily: FONTS.Onset600SemiBold
        }),
        undefined
      ])
    );
  });

  it('applies custom alignment', () => {
    const { getByText } = render(
      <Typography align="center">Centered Text</Typography>
    );

    const textElement = getByText('Centered Text');

    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          textAlign: 'center'
        }),
        undefined
      ])
    );
  });

  it('applies custom opacity', () => {
    const { getByText } = render(
      <Typography opacity={0.5}>Faded Text</Typography>
    );

    const textElement = getByText('Faded Text');

    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          opacity: 0.5
        }),
        undefined
      ])
    );
  });

  it('applies custom letterSpacing', () => {
    const { getByText } = render(
      <Typography letterSpacing={1}>Spaced Text</Typography>
    );

    const textElement = getByText('Spaced Text');

    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          letterSpacing: 1
        }),
        undefined
      ])
    );
  });

  it('applies custom style prop', () => {
    const customStyle = { marginTop: 10 };
    const { getByText } = render(
      <Typography style={customStyle}>Styled Text</Typography>
    );

    const textElement = getByText('Styled Text');

    expect(textElement.props.style).toEqual(
      expect.arrayContaining([expect.any(Object), customStyle])
    );
  });

  it('applies testID prop', () => {
    const { getByTestId } = render(
      <Typography testID="test-typography">Test ID Text</Typography>
    );

    expect(getByTestId('test-typography')).toBeDefined();
  });

  it('prioritizes last font size key when multiple are provided', () => {
    const { getByText } = render(
      <Typography subtext title>
        Multiple Keys
      </Typography>
    );

    const textElement = getByText('Multiple Keys');

    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fontSize: fontSizeMapping.title
        }),
        undefined
      ])
    );
  });
});
