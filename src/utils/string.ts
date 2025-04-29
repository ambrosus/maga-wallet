const removeNonNumericCharacters = (str: string, allowDot = true): string => {
  if (!str) return '';
  if (allowDot) return str.replace(/[^\d.]+/g, '');
  return str.replace(/[^\d]+/g, '');
};

export const StringUtils = {
  removeNonNumericCharacters
};
