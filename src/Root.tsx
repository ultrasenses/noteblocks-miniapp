import { SDKProvider, useLaunchParams } from '@telegram-apps/sdk-react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { FC, useMemo } from 'react';
import { App } from './App';

export const Root: FC = () => {
  const debug = useLaunchParams().startParam === 'debug';
  const manifestUrl = useMemo(() => {
    return new URL('tonconnect-manifest.json', window.location.href).toString();
  }, []);
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
