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
			let hR, hG, hB, hA = 'f';
			let dR, dG, dB, dA;
			let hex = item.rgba || item.rgb || '';
			hex = hex.replace('#', '');

			const sanitizeHex = val => {
				if (1 === val.length) {
					val = `${val}${val}`;
				}
				return val.toUpperCase();
			};

			if (3 === hex.length || 4 === hex.length) {
				hR = hex.charAt(0);
				hG = hex.charAt(1);
				hB = hex.charAt(2);

				if (4 === hex.length) {
					hA = hex.charAt(3);
				}
			} else if (6 === hex.length || 8 === hex.length) {
				hR = hex.substring(0, 2);
				hG = hex.substring(2, 4);
				hB = hex.substring(4, 6);

				if (8 === hex.length) {
					hA = hex.substring(6, 8);
				}
			}

			hR = sanitizeHex(hR);
			hG = sanitizeHex(hG);
			hB = sanitizeHex(hB);
			hA = sanitizeHex(hA);
			dR = parseInt(hR, 16);
			dG = parseInt(hG, 16);
			dB = parseInt(hB, 16);
			dA = Math.round(100 * parseInt(hA, 16) / 255);

			const image = item.image || 'none';
			const isDark = ((dR + dG + dB) / 3) < 160;
			const classes = ['color-swatch'];

			if (isDark) {
				classes.push('-dark');
			}

			const code = [];
			code.push(`<div class="${classes.join(' ')}" style="--color:rgba(${dR} ${dG} ${dB} / ${dA}%);--image:${image}">`);
			code.push(`<div class="-swatch">
				<h4 class="-name">${item.name}</h4>
			</div>`);

			code.push(`<ul class="-details">
				<li><span class="-label">Hex</span> <code class="-value">#${hR}${hG}${hB}</code></li>
				<li><span class="-label">RGB</span> <code class="-value">${dR}, ${dG}, ${dB}</code></li>
				<li><span class="-label">Opacity</span> <code class="-value">${dA}%</code></li>`);

			if ('none' !== image) {
				const parts = image.match(/^(.*?)\((.*?)\)/);
				if (parts && 3 === parts.length) {
					code.push(`<li><span class="-label">${parts[1]}</span> <code class="-value">${parts[2]}</code></li>`);
				} else {
					code.push(`<li><span class="-label">Image</span> <code class="-value">${image}</code></li>`);
				}
			}

			code.push(`</ul></div>`);

			return code.join('');
		},

		imageList: function (list) {
			const code = [];
			code.push('<ul class="image-list">');
			list.forEach(item => code.push(config.helpers.imageItem(item)));
			code.push('</ul>');
			return code.join('');
		},

		imageItem: function (item) {
			const code = [];
			const classes = ['-image-item'];

			if (item.isLight) {
				classes.push('-light');
			}

			code.push(`<li class="${classes.join(' ')}">`);
			code.push(`<h4 class="-title">${item.title}</h4>`);
			code.push(`<div class="-preview">
				<span class="-image-wrap">
					<img src="${item.preview}" class="-image-img" alt="${item.title}"/>
				</span>
			</div><div class="-files">`);

			for (let i = 0; i < item.files.length; i++) {
				const file = item.files[i];

				code.push(`<div class="-file">
					<a href="${file.url}" class="-link" target="_blank">${file.label}</a>
				</div>`);
			}

			code.push(`</div></li>`);

			return code.join('');
		},

		description: function (details) {
			const code = [];
			const subItemCode = [];
			code.push('<div id="description">');

			for (const [name, value] of Object.entries(details).sort()) {
				if ('object' === typeof value) {
					subItemCode.push(`<li class="-header"><span class="-name">${name}</span></li>`);
					for (const [subName, subValue] of Object.entries(value).sort()) {
						subItemCode.push(`<li class="-sub-item"><span class="-name">${subName}</span>: <code>${subValue}</code></li>`);
					}
				} else {
					code.push(`<li class="-item"><span class="-name">${name}</span>: <code>${value}</code></li>`);
				}
			}

			code.push(subItemCode.join(''));
			code.push('</div>');
			return code.join('');
		}
	}
};

exports.hbs = require('@frctl/handlebars')(config);
