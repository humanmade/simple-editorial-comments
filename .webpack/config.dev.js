const { helpers, presets } = require( '@humanmade/webpack-helpers' );

const { choosePort, cleanOnExit, filePath } = helpers;

cleanOnExit( [
	filePath( 'build', 'asset-manifest.json' ),
] );

module.exports = choosePort( 9090 ).then( ( port ) => {
	return presets.development( {
		name: 'simple-editorial-comments',
		devServer: {
			https: true,
			port,
			// Reduce watcher overhead and prevent PHP changes from triggering rebuild.
			watchOptions: {
				ignored: [ /.*\.php/, /node_modules/ ],
			},
		},
		entry: {
			'simple-editorial-comments': filePath( 'src/index.js' ),
		},
		output: {
			filename: '[name].[hash].js',
		},
	} );
} );
