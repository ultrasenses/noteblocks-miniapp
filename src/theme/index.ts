import { MantineThemeOverride } from '@mantine/core';
import '../theme/index.css';

export const createTheme = () => {
  const theme: MantineThemeOverride = {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Roboto, Apple Color Emoji, Helvetica Neue, sans-serif',
    primaryColor: 'telegram-blue',
    colors: {
      'telegram-blue': ['#e3f5ff', '#cce6ff', '#99cbff', '#62afff', '#3697ff', '#1887ff', '#007fff', '#006de5', '#0061ce', '#0053b6']
    },
    focusRing: 'never'
  };

  return theme;
};
