'use strict';

/*
 * Require the path module
 */
const path = require('path');

/*
 * Require the Fractal module
 */
const fractal = module.exports = require('@frctl/fractal').create();

// Create a new instance with custom config options
const theme = require('./theme.js');

// Tell Fractal to use the configured theme by default
fractal.web.theme(theme.main);

// Import Handlebars helpers.
const helpers = require('./helpers.js');
fractal.components.engine(helpers.hbs);
fractal.docs.engine(helpers.hbs);

/*
 * Give your project a title.
 */
fractal.set('project.title', 'Divimode Styleguide');

/*
 * Tell Fractal where to look for components.
 */
fractal.components.set('path', path.join(__dirname, '/src/components'));

/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.set('path', path.join(__dirname, '/src/docs'));

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.join(__dirname, '/assets'));

/*
 * Output folder for the fractal build command (i.e. the static HTML page).
 */
fractal.web.set('builder.dest', __dirname + '/docs');
