import React from 'react';

import { useBlockProps } from '@wordpress/block-editor';

/**
 * Define the editor interface for an editorial comment.
 *
 * @returns {React.ReactNode} Editor UI for the block.
 */
const EditEditorialComment = () => {
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<p>Editorial Comments go here</p>
		</div>
	);
};

export default EditEditorialComment;
