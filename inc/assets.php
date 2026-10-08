<?php
/**
 * Handle enqueuing block assets.
 */

namespace Simple_Editorial_Comments\Assets;

use Asset_Loader;

/**
 * Connect namespace functions to actions & hooks.
 */
function bootstrap() : void {
	if ( ! function_exists( 'Asset_Loader\\enqueue_asset' ) ) {
		trigger_error( 'Simple Editorial Comments expects humanmade/asset-loader to be installed and active' );
		return;
	}

	add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_assets' );
	add_action( 'enqueue_block_assets', __NAMESPACE__ . '\\enqueue_styles' );
}

/**
 * Get the asset manifest for the active build.
 *
 * @return string|null Path to the manifest file, or null if none was found.
 */
function get_manifest() {
	$plugin_path = trailingslashit( plugin_dir_path( dirname( __FILE__, 1 ) ) );

	return Asset_Loader\Manifest\get_active_manifest( [
		$plugin_path . 'build/development-asset-manifest.json',
		$plugin_path . 'build/production-asset-manifest.json',
	] );
}

/**
 * Enqueue the JS bundle in the block editor.
 */
function enqueue_assets() : void {
	$manifest = get_manifest();

	Asset_Loader\enqueue_asset(
		$manifest,
		'simple-editorial-comments.js',
		[
			'dependencies' => [
				'wp-blocks',
				'wp-components',
				'wp-edit-post',
				'wp-element',
				'wp-i18n',
			],
			'handle'  => 'simple-editorial-comments',
		]
	);
}

/**
 * Enqueue the editor styles.
 *
 * Hooked to enqueue_block_assets, not enqueue_block_editor_assets, so the
 * styles are copied into the iframed editor. The blocks never render on the
 * frontend, so skip it there.
 */
function enqueue_styles() : void {
	if ( ! is_admin() ) {
		return;
	}

	Asset_Loader\enqueue_asset(
		get_manifest(),
		'simple-editorial-comments.css',
		[
			'dependencies' => [],
			'handle' => 'simple-editorial-comments',
		]
	);
}
