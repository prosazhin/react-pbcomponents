import * as heroicons from '@heroicons/react/24/solid';

const icons = { undefined, ...heroicons };

export const getIconsArg = () => {
  const labels = {
    undefined: 'None',
  };

  Object.keys(heroicons).forEach((key) => {
    labels[key] = key;
  });

  return {
    options: Object.keys(icons),
    mapping: icons,
    control: {
      type: 'select',
      labels,
    },
  };
};
