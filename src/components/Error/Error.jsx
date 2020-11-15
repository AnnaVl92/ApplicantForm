import React from 'react';
import { Form } from 'react-bootstrap';
import classnames from 'classnames';

const Error = (props) => (
    <Form.Control.Feedback className={classnames("d-block", props.class)} type="invalid">
        {props.text}
    </Form.Control.Feedback>
);

export default Error;