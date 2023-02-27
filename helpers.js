const config = {
	helpers: {
		uppercase: function (str) {
			return str.toUpperCase();
		},

		colorSwatches: function (title, list) {
			const code = [];
			code.push(`<h3>${title}</h3>`);
			code.push('<div class="color-swatches">');
			list.forEach(item => code.push(config.helpers.colorSwatch(item)));
			code.push('</div>');
			return code.join('');
		},

		colorSwatch: function (item) {
			return `<div class="color-swatch" style="--color:${item.rgb};">
				<div class="-swatch"></div>
				<h4 class="-name">${item.name}</h4>
				RGB: <code class="-rgb">${item.rgb}</code>
			</div>`;
		}
	}
};

exports.hbs = require('@frctl/handlebars')(config);
