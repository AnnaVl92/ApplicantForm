import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import styles from "../Modal.module.scss";

export default class AgreementModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }

    handleClose = () => this.setState({
        show: false
    });

    handleShow = () => this.setState({
        show: true
    });

    render () {
        const modalLink = <>
            <sup>* </sup> 
            Я согласен с 
            <Button className={styles.modalLink} variant="link" onClick={this.handleShow}>
                политикой конфиденциальности
            </Button>
        </>;

        return (
            <>
                <Form.Group controlId="agreementCheckbox">
                    <Form.Check
                        required
                        className={styles.modalCheckbox} 
                        name="isAgreementChecked"
                        type="checkbox"
                        checked={this.props.isChecked} 
                        label={modalLink}
                        onChange={this.props.onChange} 
                    />
                </Form.Group>
                <Modal className={styles.modal} scrollable show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header className={styles.modalHeader} closeButton>
                        <Modal.Title className={styles.modalTitle}>
                            Политика конфиденциальности
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={styles.modalBody}>
                        <p><strong>1. Общие положения</strong></p>
                        <p>Настоящая политика обработки персональных данных составлена в&nbsp;соответствии 
                            с&nbsp;требованиями Федерального закона от&nbsp;27.07.2006. &#8470;&nbsp;152-ФЗ &laquo;
                            О&nbsp;персональных данных&raquo; и&nbsp;определяет порядок обработки персональных данных 
                            и&nbsp;меры по&nbsp;обеспечению безопасности персональных данных 
                            Михайловым Иваном Сергеевичем (далее&nbsp;&mdash; Оператор).
                        </p>
                        <p>1. Оператор ставит своей важнейшей целью и&nbsp;условием осуществления своей деятельности
                             соблюдение прав и&nbsp;свобод человека и&nbsp;гражданина 
                             при обработке его персональных данных, 
                             в&nbsp;том числе защиты прав на&nbsp;неприкосновенность частной жизни, 
                             личную и&nbsp;семейную тайну.
                        </p>
                        <p>2. Настоящая политика Оператора в&nbsp;отношении обработки персональных данных 
                            (далее&nbsp;&mdash; Политика) применяется ко&nbsp;всей информации, 
                            которую Оператор может получить о&nbsp;посетителях веб-сайта
                        </p>
                        <p>3. Оператор ставит своей важнейшей целью и&nbsp;условием осуществления своей деятельности 
                            соблюдение прав и&nbsp;свобод человека и&nbsp;гражданина при обработке его персональных данных, 
                            в&nbsp;том числе защиты прав на&nbsp;неприкосновенность частной жизни, 
                            личную и&nbsp;семейную тайну.
                        </p>
                        <p>4. Настоящая политика Оператора в&nbsp;отношении обработки персональных данных 
                            (далее&nbsp;&mdash; Политика) применяется ко&nbsp;всей информации, 
                            которую Оператор может получить о&nbsp;посетителях веб-сайта
                        </p>
                    </Modal.Body>
                    <Modal.Footer className={styles.modalFooter}>
                        <Button className={styles.modalButton} variant="primary" onClick={this.handleClose}>
                            Я согласен
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
};