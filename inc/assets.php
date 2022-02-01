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
	}
}
