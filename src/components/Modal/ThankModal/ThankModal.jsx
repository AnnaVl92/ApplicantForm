import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from './ThankModal.module.scss';
import classnames from 'classnames';

const ThankModal = (props) => (
    <Modal 
        className={classnames(styles.modal,styles.thankModal)}
        show={props.show}
        onHide={props.close}
        animation={false}
    >
        <Modal.Header className={classnames(styles.modalHeader, styles.thankModalHeader)} closeButton>
            <Modal.Title className={styles.modalTitle}>
                Спасибо {props.name}!
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className={classnames(styles.modalBody,styles.thankModalBody)}>
            Мы скоро свяжемся с вами
        </Modal.Body>
        <Modal.Footer className={classnames(styles.modalFooter,styles.thankModalFooter)}>
            <Button 
                className={classnames(styles.modalButton,styles.thankModalButton)} 
                variant="primary" 
                onClick={props.close}
            >
                Понятно
            </Button>
        </Modal.Footer>
    </Modal>
);

export default ThankModal;