// Require the Mandelbrot theme module.
const mandelbrot = require('@frctl/mandelbrot');

exports.main = mandelbrot({
	skin: {
		name: 'default',
		accent: '#6200EA',
		links: '#a06'
	},
	styles: [
		'default',
		'/main.css'
	],
	nav: ['search', 'docs', 'components', 'information'],
	panels: ['notes', 'html', 'view', 'resources', 'info'],
	navigation: 'split',
	favicon: '/favicon.png'
});
