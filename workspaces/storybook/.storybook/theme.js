import { create } from 'storybook/theming/create';

const common = {
  brandTitle: 'pbcomponents',
};

export const lightTheme = create({ ...common, base: 'light' });
export const darkTheme = create({ ...common, base: 'dark' });

export default lightTheme;
