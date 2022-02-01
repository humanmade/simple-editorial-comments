<?php
/**
 * Register blocks on the PHP side.
 */

namespace Simple_Editorial_Comments\Blocks;

/**
 * Connect namespace functions to actions & hooks.
 */
function bootstrap() : void {
	add_action( 'init', __NAMESPACE__ . '\\register_blocks' );
}

/**
 * Register our block with the PHP framework.
 */
function register_blocks() : void {
	register_block_type(
		dirname( __DIR__ ) . '/src/blocks/editorial-comment'
	);
}
