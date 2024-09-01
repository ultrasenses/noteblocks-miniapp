import type { ComponentType, JSX } from 'react';

import { IndexPage } from './IndexPage/IndexPage.tsx';
import { NotePage } from './NotPage/NotePage.tsx';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: IndexPage },
  { path: '/note/:id', Component: NotePage }
];
