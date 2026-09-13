import { PBCProvider } from '@prosazhin/pbcomponents';
import type { Preview } from '@storybook/react-vite';
import React, { useEffect } from 'react';

type Theme = 'light' | 'dark';

// Светлая тема по умолчанию — принудительно, а не системная: атрибут ставим сразу при загрузке
// превью, чтобы и страницы без историй (Intro) не зависели от prefers-color-scheme
if (typeof document !== 'undefined') {
  document.documentElement.dataset.theme = 'light';
}

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      codePanel: true,
    },
    actions: {
      disable: true,
    },
    interactions: {
      disable: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Цветовая тема компонентов',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        dynamicTitle: true,
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, { globals }) => {
      const theme = (globals.theme ?? 'light') as Theme;

      useEffect(() => {
        // pbstyles переключает токены по data-theme на html; ставим значение явно,
        // чтобы выбранная тема не зависела от системной prefers-color-scheme
        document.documentElement.dataset.theme = theme;

        // фон превью берём из токенов, чтобы канвас менялся вместе с компонентами
        document.body.style.backgroundColor = 'var(--theme-color-basic-0)';
        document.body.style.color = 'var(--theme-color-text-primary)';
      }, [theme]);

      return (
        <PBCProvider>
          <Story />
        </PBCProvider>
      );
    },
  ],
};

export default preview;
