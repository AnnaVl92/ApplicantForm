import React from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import styles from "./ApplicantForm.module.scss";
import classnames from 'classnames';
import AgreementModal from "../Modal/AgreementModal/AgreementModal";
import ThankModal from "../Modal/ThankModal/ThankModal";
import Error from "../Error/Error";
import errors from '../../data/formErrors.json';

const nameRegExp = /^[a-zA-ZА-Яа-яЁё]+$/;
const emailRegExp = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
const githublinkRegExp = /(?<name>https:\/\/github.com\/)/;

const initialState = {
    formData: {
        name: '',
        surname: '',
        email: '',
        gender: '',
        file: '',
        githubLink: '',
        isAgreementChecked: false
    },
    validationErrors: {
        name: false,
        surname: false,
        email: false,
        gender: false,
        file: false,
        githubLink: false,
        isAgreementChecked: false
    },
    isThankModalShown: false,
    applicantName: ''
};

class ApplicantForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(JSON.stringify(initialState));// deep clone
    };

    handleChange = (event, regexp, paramName) => {
        const haveError = !event.target.value.match(regexp);
        const state = {...this.state};
        state.validationErrors[paramName] = haveError;
        state.formData[paramName] = event.target.value;
        this.setState(state);
    };
    
    chooseGender = (event) => {
        const state = {...this.state};
        state.formData.gender = event.target.value;
        state.validationErrors.gender = false;
        this.setState(state);
    };

    uploadCV = (event) => {
        const state = {...this.state};
        state.formData.file = event.target.files[0].name;
        this.setState(state);
    };

    deleteCV = () => {
        const state = {...this.state};
        state.formData.file = '';
        this.setState(state);
    };

    handleCheckboxChange = (event) => {
        const state = {...this.state};
        state.formData.isAgreementChecked = event.target.checked;
        state.validationErrors.isAgreementChecked = !event.target.checked;
        this.setState(state);
    };

    handleButtonDisable = () => (!this.state.formData.name || !this.state.formData.surname || !this.state.formData.email) 
    || (this.state.validationErrors.surname || this.state.validationErrors.name || this.state.validationErrors.email);

    handleSubmit = (event) => {
        const form = event.currentTarget;
        const state = {...this.state};
        event.preventDefault();
        event.stopPropagation();
        if (!form.checkValidity()) {
            if (!state.formData.gender) {
                state.validationErrors.gender = true;
                this.setState(state);
            };
            if (!state.formData.isAgreementChecked) {
                state.validationErrors.isAgreementChecked = true;
                this.setState(state);
            };
        } else {
            this.setState({ isThankModalShown: true });
            let data = {...this.state.formData};
            this.setState({ applicantName: data.name });
        };
    };

    closeThankModal = () => this.setState({...initialState});

    render() {
        return (
            <Form 
                noValidate 
                className={styles.form}
                onSubmit={(e) => this.handleSubmit(e)}
            >
                <h1>Анкета соискателя</h1>
                <Row className={styles.row}>
                    <Col className={styles.column} xs={12}>
                        <h2 className={classnames("h4", styles.subtitle)}>Личные данные</h2>
                    </Col>
                    <Col className={styles.column} xs={12} md={6}>
                        <Form.Group className={styles.formGroup}>
                            <Form.Label className={styles.labelTitle}>
                                Имя <sup>*</sup>
                            </Form.Label>
                            <Form.Control
                                className={classnames(styles.input, {'is-invalid': this.state.validationErrors.name})}
                                required
                                name="name"
                                type="text" 
                                placeholder="Имя"
                                value = {this.state.formData.name}
                                onChange = {(e) => this.handleChange(e,nameRegExp,'name')}
                            />
                            {this.state.validationErrors.name && <Error text={errors.name}/>}
                        </Form.Group>
                    </Col>
                    <Col className={styles.column} xs={12} md={6}>
                        <Form.Group className={styles.formGroup}>
                            <Form.Label className={styles.labelTitle}>
                                Фамилия <sup>*</sup>
                            </Form.Label>
                            <Form.Control
                                className={classnames(styles.input, {'is-invalid': this.state.validationErrors.surname})}
                                required
                                name="surname"
                                type="text" 
                                placeholder="Фамилия"
                                value = {this.state.formData.surname}
                                onChange = {(e) => this.handleChange(e,nameRegExp,'surname')}
                            />
                            {this.state.validationErrors.surname && <Error text={errors.surname}/>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row className={styles.row}>
                    <Col className={styles.column} xs={12} md={6}>
                        <Form.Group>
                            <Form.Label className={styles.labelTitle}>
                                Электронная почта <sup>*</sup>
                            </Form.Label>
                            <Form.Control
                                className={classnames(styles.input,{'is-invalid': this.state.validationErrors.email})}
                                required
                                name="email"
                                type="email"
                                placeholder="Электронная почта"
                                value = {this.state.formData.email}
                                onChange = {(e) => this.handleChange(e,emailRegExp,'email')}
                            />
                            {this.state.validationErrors.email && <Error text={errors.email}/>}
                        </Form.Group>
                    </Col>
                    <Col className={styles.column} xs={12} md={6}>
                        <Form.Group className={styles.fileUploadContainer}>
                            {
                                !this.state.formData.file && 
                                    <Form.File
                                        className={styles.fileUpload} 
                                        id="uploadFile" 
                                        label="Загрузить резюме"
                                        onChange={(e) => this.uploadCV(e)} 
                                    />
                            }
                            {
                                this.state.formData.file && 
                                    <Alert
                                        className={styles.file}
                                        onClose={() => this.deleteCV()}
                                        dismissible
                                    >
                                        {this.state.formData.file}
                                    </Alert>
                            }
                        </Form.Group>
                    </Col>
                </Row>
                <Row className={styles.row}>
                    <Col className={styles.column} xs={8} md={7}>
                        <h2 className={classnames("h4 d-flex align-items-center",styles.subtitle)}>
                            Пол <sup>*</sup>
                            {this.state.validationErrors.gender && <Error class={styles.genderError} text={errors.gender}/>}
                        </h2>
                        <Form.Group className="d-flex justify-content-between">
                            <Form.Check
                                required
                                className={styles.radio} 
                                type="radio"
                                name="gender"
                                id="maleRadio"
                                label="Мужской"
                                value="male"
                                onChange={this.chooseGender}
                                checked={this.state.formData.gender === "male"}
                            />
                            <Form.Check
                                required
                                className={styles.radio} 
                                type="radio" 
                                name="gender"
                                id="femaleRadio"
                                label="Женский"
                                value="female"
                                onChange={this.chooseGender}
                                checked={this.state.formData.gender === "female"}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className={styles.row}>
                    <Col className={styles.column} xs={12} md={6}>
                        <h2 className={classnames("h4",styles.subtitle)}>Github</h2>
                        <Form.Group className={styles.formGroup}>
                            <Form.Label className={styles.labelTitle}>
                                Вставьте ссылку на Github
                            </Form.Label>
                            <Form.Control
                                className={classnames(styles.input,{'is-invalid': this.state.validationErrors.githubLink})}
                                name="githubLink"
                                type="text" 
                                placeholder="Вставьте ссылку на Github"
                                value={this.state.formData.githubLink}
                                onChange={(e) => this.handleChange(e,githublinkRegExp,"githubLink")}
                            />
                            {this.state.validationErrors.githubLink && <Error text={errors.link}/>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row className={styles.row}>
                    <Col className={styles.column} xs={12} md={8}>
                        <AgreementModal
                            isChecked = {this.state.formData.isAgreementChecked}
                            onChange={(e) => this.handleCheckboxChange(e)}
                        />
                        {this.state.validationErrors.isAgreementChecked && <Error text={errors.agreement}/>}
                        <Button 
                            className={styles.submitBtn} 
                            variant="primary" 
                            type="submit"
                            block
                            disabled={this.handleButtonDisable()}
                        >
                            Отправить
                        </Button>
                        <ThankModal 
                            show={this.state.isThankModalShown}
                            close={this.closeThankModal}
                            name={this.state.applicantName}
                        />
                    </Col>
                </Row>
            </Form>
        )
    }
};

export default ApplicantForm;