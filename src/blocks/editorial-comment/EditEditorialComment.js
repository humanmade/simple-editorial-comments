import React from 'react';

import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Modal, Button } from '@wordpress/components';
import { dispatch, select, subscribe, useDispatch } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import './style.scss';

/**
 * Define the editor interface for an editorial comment.
 *
 * @param {object}   props               React component props.
 * @param {object}   props.attributes    Block attributes object.
 * @param {object}   props.clientId      Block client ID.
 * @param {Function} props.setAttributes Block attribute setter function.
 * @returns {React.ReactNode} Editor UI for the block.
 */
const EditEditorialComment = ( { attributes, clientId, setAttributes } ) => {
	const [ confirmDialogOpen, setConfirmDialogOpen ] = useState( false );
	const blockProps = useBlockProps( {
		className: 'simple-editorial-comment',
	} );

	const getBlockList = () => select( 'core/block-editor' ).getBlocks();

	let blockList = getBlockList();

	subscribe( () => {
		const newBlockList = getBlockList();
		if (
			newBlockList.length < blockList.length &&
			newBlockList.every( block => {
				return block.name !== 'simple-editorial-comments/editorial-comment' && block.attributes.status === 'confirmedDelete'
			} )
		) {
			dispatch( 'core/block-editor' ).resetBlocks( blockList );
		}
		blockList = newBlockList;
	} );

	const { removeBlock } = useDispatch( 'core/block-editor' );

	return (
		<div { ...blockProps } data-note-text={ __( 'Note', 'simple-editorial-comments' ) }>
			<RichText
				className="simple-editorial-comment__comment-text"
				tagName="p"
				value={ attributes.comment }
				placeholder={ __( 'Leave an internal note about this article here...', 'simple-editorial-comments' ) }
				onChange={ ( comment ) => setAttributes( { comment } ) }
			/>
			<footer>
				{ confirmDialogOpen && (
					<Modal
						title={ __( 'Resolve Editorial Comment?', 'simple-editorial-comments' ) }
						onRequestClose={ () => setConfirmDialogOpen( false ) }
					>
						<p>{ __( 'Are you sure you want to resolve and delete the inline editorial comment?', 'simple-editorial-comments' ) }</p>
						<div className="simple-editorial-comment-modal__buttons">
							<Button isSecondary onClick={ () => setConfirmDialogOpen( false ) }>
								{ __( 'Cancel', 'simple-editorial-comments' ) }
							</Button>
							<Button isPrimary onClick={ () => {
								setAttributes( { status: 'confirmedDelete' } );
								removeBlock( clientId );
							 } }>
								{ __( 'Confirm', 'simple-editorial-comments' ) }
							</Button>
						</div>
					</Modal>
				) }
				<Button
					isPrimary
					onClick={ () => setConfirmDialogOpen( true ) }
				>
					{ __( 'Resolve Comment', 'simple-editorial-comments' ) }
				</Button>
				<small>{ __( 'This comment will not render to users.', 'simple-editorial-comments' ) }</small>
			</footer>
		</div>
	);
};

export default EditEditorialComment;
