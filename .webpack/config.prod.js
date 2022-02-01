const { helpers, plugins, presets } = require( '@humanmade/webpack-helpers' );

const { filePath } = helpers;

module.exports = presets.production( {
	name: 'simple-editorial-comments',
	entry: {
		'simple-editorial-comments': filePath( 'src/index.js' ),
	},
	output: {
		filename: '[name].[contenthash].min.js',
	},
	plugins: [
		plugins.clean(),
	],
} );
