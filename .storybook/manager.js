import { addons } from '@storybook/addons';

addons.setConfig({
	isFullscreen: false,
	toolbar: {
		zoom: { hidden: true, },
		eject: { hidden: true, },
		copy: { hidden: true, },
		fullscreen: { hidden: true, },
	},
});
