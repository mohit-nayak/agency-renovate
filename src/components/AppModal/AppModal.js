import React from 'react';
import Modal from 'react-bootstrap/Modal';
import styles from './AppModal.module.scss';
import './modalOverwrite.css';

const AppModal = ({ children, show, onHide }) => {
    return (
        <Modal centered
               show={show}
               onHide={onHide}
               className={styles.Modal}>
            <Modal.Body>
                { children }
            </Modal.Body>
        </Modal>
    );
};

export default AppModal;
