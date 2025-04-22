import { PropsWithChildren } from 'react';
import { createContextSelector } from '@lib';
import { RouterContextParams } from './types';

const RouterContext = ({ route }: RouterContextParams & PropsWithChildren) => ({
  route
});

export const [RouterProvider, useRouterContext] =
  createContextSelector(RouterContext);

export const useCurrentRoute = () => useRouterContext(({ route }) => route);
