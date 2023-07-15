import React, {useContext, useEffect, useState} from 'react';
import {Context as appContext} from "../../context/AppContext";
import {Context as authContext} from "../../context/AuthContext";
import Form from "react-bootstrap/Form";
import Input from "../Input/Input";
import AppButton from "../AppButton/AppButton";
import styles from "./CreateUserForm.module.scss";

const CreateUserForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [edited, setEdited] = useState(false);
    const { startLoading, stopLoading } = useContext(appContext);
    const { state: { createUserErrorMessage, createUserSuccess, isSuperAdmin }, createUser } = useContext(authContext);

    const submitHandler = (e) => {
        e.preventDefault();

        startLoading();
        setEdited(false);
        createUser(email, password, isSuperAdmin, stopLoading);
    };

    useEffect(() => {
        setEdited(true);
    }, [email, password]);

    return (
        <Form onSubmit={submitHandler} className={styles.Wrapper}>
            <h5>Create new admin</h5>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Input type="email" value={email} onChange={setEmail} placeholder="E.g. john@agency.com" required={true} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Input type="password" value={password} placeholder="**********" onChange={setPassword} required={true} />
            </Form.Group>
            { createUserErrorMessage && <p className={styles.ErrorMsg}>{ createUserErrorMessage }</p> }
            { (createUserSuccess && !edited) && <p className={styles.SuccessMsg}>User created successfully!</p> }
            <AppButton type="submit" classes={[styles.SubmitBtn]}>Login</AppButton>
        </Form>
    );
};

export default CreateUserForm;
