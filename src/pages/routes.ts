import type { ComponentType, JSX } from 'react';

import { DocumentPage } from './DocumentPage';
import { IndexPage } from './IndexPage';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: IndexPage },
  { path: '/document', Component: DocumentPage }
];
