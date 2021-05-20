import React, { useState, useContext } from 'react';
import Input from '../Input/Input';
import Form from 'react-bootstrap/Form';
import AppButton from '../AppButton/AppButton';
import { Context as appContext } from '../../context/AppContext';
import { Context as authContext } from '../../context/AuthContext';
import styles from './AuthForm.module.scss';

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { startLoading, stopLoading } = useContext(appContext);
    const { state: { errorMessage }, signIn } = useContext(authContext);

    const submitHandler = (e) => {
        e.preventDefault();

        startLoading();
        signIn(email, password, stopLoading);
    };

    return (
        <Form onSubmit={submitHandler} className={styles.Wrapper}>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Input type="email" value={email} onChange={setEmail} placeholder="E.g. john@agency.com" required={true} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Input type="password" value={password} placeholder="**********" onChange={setPassword} required={true} />
            </Form.Group>
            { errorMessage && <p className={styles.ErrorMsg}>{ errorMessage }</p> }
            <AppButton type="submit" classes={[styles.SubmitBtn]}>Login</AppButton>
        </Form>
    );
};

export default AuthForm;
