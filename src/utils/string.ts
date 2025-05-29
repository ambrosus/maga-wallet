import { isAndroid } from '@constants';

export class StringUtils {
  private static removeExtraDots(str: string): string {
    let firstDotFound = false;
    return str
      .split('')
      .filter((char) => {
        if (char === '.' && !firstDotFound) {
          firstDotFound = true;
          return true;
        }
        return char !== '.';
      })
      .join('');
  }

  public static removeNonNumericCharacters(
    str: string,
    allowDot = true
  ): string {
    if (!str) return '';
    if (allowDot) return str.replace(/[^\d.]+/g, '');
    return str.replace(/[^\d]+/g, '');
  }

  public static formatNumberInput(str: string): string {
    const dottedStr = str.replaceAll(',', '.');
    // Check if the first character is a dot
    const isFirstCharacterDot = dottedStr.startsWith('.');
    const currentFlow = isFirstCharacterDot ? '0' + dottedStr : dottedStr;
    let numericChars = this.removeNonNumericCharacters(currentFlow);

    if (
      numericChars.length > 1 &&
      numericChars.startsWith('0') &&
      !numericChars.startsWith('0.')
    ) {
      numericChars = numericChars.slice(1);
    }

    if (/^0+$/.test(numericChars)) {
      return '0';
    }

    const [integerPart, decimalPart = ''] = numericChars.split(',');
    // Remove leading zeros from the integer part
    const formattedIntegerPart = integerPart.replace(/^0+(?=[1-9])/, '');
    let formattedDecimalPart = '';

    if (decimalPart) {
      formattedDecimalPart = '.' + decimalPart.replace(/(\.[1-9]*)0+$/, '$1');
    }

    if (str.includes('.') && !decimalPart) {
      formattedDecimalPart = '.';
    }

    return this.removeExtraDots(formattedIntegerPart + formattedDecimalPart);
  }

  public static wrapAndroidString(
    str: string,
    focused: boolean,
    maxLength = 10,
    _isAndroid = isAndroid
  ): string {
    if (!focused && _isAndroid && str.length > maxLength) {
      return `${str.slice(0, maxLength)}...`;
    }
    return str;
  }

  public static formatAddress(
    address: string,
    paddingLeft: number,
    paddingRight: number,
    dotCount = 3
  ): string {
    if (!address || typeof address !== 'string') return '';
    if (paddingLeft + paddingRight >= address.length) return address;
    let str = '';
    let dotCounter = 0;
    for (let i = 0; i < address.length; i++) {
      if (i < paddingLeft || address.length - i <= paddingRight)
        str += address[i];
      else if (dotCounter < dotCount) {
        str += '.';
        dotCounter++;
      }
    }
    return str;
  }
}
