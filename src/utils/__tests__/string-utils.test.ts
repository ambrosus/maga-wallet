import { StringUtils } from '@utils/string-utils';

describe('StringUtils.removeNonNumericCharacters', () => {
  it('should remove all non-numeric characters except dot by default', () => {
    expect(StringUtils.removeNonNumericCharacters('a1b2.c3!')).toBe('12.3');
  });

  it('should remove all non-numeric characters and dots if allowDot is false', () => {
    expect(StringUtils.removeNonNumericCharacters('a1b2.c3!', false)).toBe(
      '123'
    );
  });

  it('should return empty string for empty input', () => {
    expect(StringUtils.removeNonNumericCharacters('')).toBe('');
  });

  it('should handle strings with only non-numeric characters', () => {
    expect(StringUtils.removeNonNumericCharacters('abc!@#')).toBe('');
  });

  it('should handle strings with only numbers and dots', () => {
    expect(StringUtils.removeNonNumericCharacters('1.2.3.4')).toBe('1.2.3.4');
    expect(StringUtils.removeNonNumericCharacters('1.2.3.4', false)).toBe(
      '1234'
    );
  });
});
