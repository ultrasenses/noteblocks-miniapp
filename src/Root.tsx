import { SDKProvider, useLaunchParams } from '@telegram-apps/sdk-react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { FC, useEffect, useMemo } from 'react';
import { App } from './App';
import { ErrorBoundary } from './ErrorBoundary';

const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
  <div>
    <blockquote>
      <code>{error instanceof Error ? error.message : typeof error === 'string' ? error : JSON.stringify(error)}</code>
    </blockquote>
  </div>
);

const Inner: FC = () => {
  const debug = useLaunchParams().startParam === 'debug';
  const manifestUrl = useMemo(() => {
    return new URL('tonconnect-manifest.json', window.location.href).toString();
  }, []);

  // Enable debug mode to see all the methods sent and events received.
  useEffect(() => {
    if (debug) {
      import('eruda').then((lib) => lib.default.init());
    }
  }, [debug]);

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <SDKProvider
        acceptCustomStyles
        debug={debug}
      >
        <App />
      </SDKProvider>
    </TonConnectUIProvider>
  );
};

export const Root: FC = () => (
  <ErrorBoundary fallback={ErrorBoundaryError}>
    <Inner />
  </ErrorBoundary>
);
