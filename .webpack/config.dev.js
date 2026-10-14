const { externals, helpers, plugins, presets } = require( '@humanmade/webpack-helpers' );

const { choosePort, cleanOnExit, filePath } = helpers;
const { MiniCssExtractPlugin } = plugins.constructors;

cleanOnExit( [
	filePath( 'build', 'asset-manifest.json' ),
] );

module.exports = choosePort( 9090 ).then( ( port ) => {
	return presets.development( {
		name: 'simple-editorial-comments',
		// webpack-helpers infers http unless devServer.https is set, which dev server 5 rejects.
		output: {
			publicPath: `https://localhost:${ port }/build/`,
		},
		devServer: {
			server: 'https',
			port,
		},
		externals,
		entry: {
			'simple-editorial-comments': filePath( 'src/index.js' ),
		},
		plugins: [
			plugins.miniCssExtract(),
		],
	}, {
		// style-loader injects into the admin document, not the editor iframe. Extract to a file for enqueue_block_assets.
		filterLoaders: ( loader, key ) => key === 'style' ? MiniCssExtractPlugin.loader : loader,
	} );
} );
