import { MantineProvider } from '@mantine/core';
import {
  FC
  // , useEffect, useMemo
} from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// import { SDKProvider, useLaunchParams } from '@telegram-apps/sdk-react';
// import { TonConnectUIProvider } from '@tonconnect/ui-react';
// import { App } from './App';
import { ErrorBoundary } from './ErrorBoundary';
import { routes } from './pages/routes';
import { createTheme } from './theme';

const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
  <div>
    <blockquote>
      <code>{error instanceof Error ? error.message : typeof error === 'string' ? error : JSON.stringify(error)}</code>
    </blockquote>
  </div>
);

const Inner: FC = () => {
  // const debug = useLaunchParams().startParam === 'debug';
  // const manifestUrl = useMemo(() => {
  //   return new URL('tonconnect-manifest.json', window.location.href).toString();
  // }, []);
  //
  // // Enable debug mode to see all the methods sent and events received.
  // useEffect(() => {
  //   if (debug) {
  //     import('eruda').then((lib) => lib.default.init());
  //   }
  // }, [debug]);
  //
  // return (
  //   <TonConnectUIProvider manifestUrl={manifestUrl}>
  //     <SDKProvider
  //       acceptCustomStyles
  //       debug={debug}
  //     >
  //       <App />
  //     </SDKProvider>
  //   </TonConnectUIProvider>
  // );

  const theme = createTheme();

  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              {...route}
            />
          ))}
          <Route
            path='*'
            element={<Navigate to='/' />}
          />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
};

export const Root: FC = () => (
  <ErrorBoundary fallback={ErrorBoundaryError}>
    <Inner />
  </ErrorBoundary>
);
