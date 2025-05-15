// eslint-disable-next-line no-console
export const devLogger = (message: string) => __DEV__ && console.log(message);

export const devErrorLogger = (message: string, error?: unknown) =>
  __DEV__ && console.error(message, error);
