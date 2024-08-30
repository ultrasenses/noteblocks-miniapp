import { useIntegration } from '@telegram-apps/react-router-integration';
import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  initNavigator,
  useMiniApp,
  useThemeParams,
  useViewport
} from '@telegram-apps/sdk-react';
import { type FC, useEffect, useMemo } from 'react';
import { Navigate, Route, Router, Routes } from 'react-router-dom';

import { MantineProvider } from '@mantine/core';
import { routes } from './pages/routes';
import { createTheme } from './theme';

export const App: FC = () => {
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  // Create a new application navigator and attach it to the browser history, so it could modify
  // it and listen to its changes.
  const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
  const [location, reactNavigator] = useIntegration(navigator);

  // Don't forget to attach the navigator to allow it to control the BackButton state as well
  // as browser history.
  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  const theme = createTheme();

  return (
    <MantineProvider
      theme={theme}
      forceColorScheme={miniApp.isDark ? 'dark' : 'light'}
    >
      <Router
        location={location}
        navigator={reactNavigator}
      >
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
      </Router>
    </MantineProvider>
  );
};
