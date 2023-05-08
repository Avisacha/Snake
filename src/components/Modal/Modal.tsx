import React, { Component, useEffect } from 'react'
import './Modal.css'
interface Props {
	modal: {
		popup: boolean,
		msg?: string
	}

	getModalClose: (data: boolean) => void;
}

const Modal = (props: Props) => {
	const onClick = () => {
		props.modal.popup = false;
		props.getModalClose(true);
	}

	return (
		<>
			<div className={`${props.modal.popup ? '' : 'Hidden'} Modal`}>
				<p>
					{"Votre score: " + props.modal.msg}
				</p>
				<button className='btn' onClick={onClick}>Restart</button>
			</div>
		</>
	)
}

export default Modal