const { externals, helpers, plugins, presets } = require( '@humanmade/webpack-helpers' );

const { filePath } = helpers;

module.exports = presets.production( {
	name: 'simple-editorial-comments',
	externals,
	// Webpack 5 defaults to 'auto', which the asset manifest writes as a path prefix.
	output: {
		publicPath: '',
	},
	entry: {
		'simple-editorial-comments': filePath( 'src/index.js' ),
	},
	plugins: [
		plugins.clean(),
	],
} );
