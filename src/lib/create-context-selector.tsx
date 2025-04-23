import { FC, Context } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

type CreateContextSelectorTuple<Props, Value> = [
  FC<Props>,
  <Selected>(selector: (value: Value) => Selected) => Selected
];

export function createContextSelector<Props, Value>(
  useValue: (props: Props) => Value
): CreateContextSelectorTuple<Props, Value> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Context = createContext(null) as Context<any>;

  // @ts-ignore
  const Provider: FC<Props> = ({ children, ...props }) => {
    return (
      // @ts-ignore
      <Context.Provider value={useValue(props as Props)}>
        {children}
      </Context.Provider>
    );
  };

  function useContextSelectorHook<Selected>(
    selector: (value: Value) => Selected
  ): Selected {
    try {
      return useContextSelector(Context, selector);
    } catch (error: unknown) {
      throw new Error(`Missing Provider - ${error}`);
    }
  }

  return [Provider, useContextSelectorHook];
}
