import { GLOBALS_UPDATED, SET_GLOBALS } from 'storybook/internal/core-events';
import { addons } from 'storybook/manager-api';
import { darkTheme, lightTheme } from './theme';

addons.setConfig({
  theme: lightTheme,
  showPanel: true,
  panelPosition: 'bottom',
});

// синхронизируем оформление самого Storybook с переключателем темы из тулбара
addons.register('pbcomponents/theme-sync', (api) => {
  const applyTheme = ({ globals }) => {
    api.setOptions({ theme: globals?.theme === 'dark' ? darkTheme : lightTheme });
  };

  const channel = api.getChannel();

  channel.on(SET_GLOBALS, applyTheme);
  channel.on(GLOBALS_UPDATED, applyTheme);
});
