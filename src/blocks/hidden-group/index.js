import React from 'react';

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import blockData from './block.json';

import './hidden-group.scss';

const HIDDEN_GROUP_BLOCK_TEMPLATE = [
	[ 'simple-editorial-comments/editorial-comment', {
		comment: __( 'Explain why this group is hidden.', 'simple-editorial-comments' ),
	} ],
	[ 'core/group', {} ],
];

/**
 * Define the editor interface for an editorial comment.
 *
 * @returns {React.ReactNode} Editor UI for the block.
 */
const EditHiddenGroup = () => {
	const blockProps = useBlockProps( {
		className: 'simple-editorial-comments-hidden-group',
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks
				template={ HIDDEN_GROUP_BLOCK_TEMPLATE }
				templateLock="all"
			/>
		</div>
	);
};

export const name = blockData.name;

export const settings = {
	// Apply the block settings from the JSON configuration file.
	...blockData,

	edit: EditHiddenGroup,

	/**
	 * Return null on save so rendering can be done in PHP.
	 *
	 * @returns {null} Empty so that server can complete rendering.
	 */
	save() {
		return (
			<InnerBlocks.Content />
		);
	},

	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/group' ],
				transform: ( attributes, innerBlocks ) => {
					return createBlock(
						blockData.name,
						{},
						[
							createBlock(
								'simple-editorial-comments/editorial-comment',
								{
									comment: __( 'Explain why this group is hidden.', 'simple-editorial-comments' ),
								}
							),
							createBlock( 'core/group', attributes, innerBlocks ),
						]
					);
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'core/group' ],
				transform: ( attributes, innerBlocks ) => {
					return innerBlocks.filter( ( { name } ) => name === 'core/group' );
				},
			},
		],
	},
};
