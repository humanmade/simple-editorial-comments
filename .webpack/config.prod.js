const { externals, helpers, plugins, presets } = require( '@humanmade/webpack-helpers' );

const { filePath } = helpers;

module.exports = presets.production( {
	name: 'simple-editorial-comments',
	externals,
	entry: {
		'simple-editorial-comments': filePath( 'src/index.js' ),
	},
	plugins: [
		plugins.clean(),
	],
} );
