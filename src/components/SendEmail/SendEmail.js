import React, {useEffect, useState} from 'react';
import emailJs from 'emailjs-com';
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import AppButton from "../AppButton/AppButton";
import { validateEmail } from '../../utility/functions';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import styles from './SendEmail.module.scss';

const SendEmail = ({ data, onHide }) => {
    const [email, setEmail] = useState("");
    const [isSuccess, setIsSuccess] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const onSubmit = e => {
        e.preventDefault();

        if (validateEmail(email)) {
            const params = {
                email,
                id: data.id,
                username: data.user.name,
                userContact: data.user.contact,
                userEmail: data.user.email,
                preferredContactMethod: data.user.preferredContactMethod,
                topic: data.title,
                desc: data.desc,
                budget: data.budget,
                location: data.location,
                propertyType: data.propertyType,
                renovationTime: data.renovationTime,
                renovationPropertyFor: data.renovationPropertyFor,
                renovationPropertyType: data.renovationPropertyType,
            };
            console.log("params", params);

            emailJs.send('service_ljqv7jm', 'template_uhj6cvc', params, 'user_eCLoXXLlJclINLm43Xu2U')
                .then(res => {
                    setErrorMsg(null);
                    setIsSuccess(true);
                }, err => {
                    setErrorMsg(err);
                    setIsSuccess(false);
                });
        }
        else {
            setErrorMsg('Please enter a valid email.');
        }
    };

    useEffect(() => {
        setIsSuccess(null);
        setErrorMsg("");
    }, [email]);

    return (
        <div className={styles.Wrapper}>
            <Form inline onSubmit={onSubmit}>
                <InputGroup>
                    <FormControl value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className={styles.Input} />
                    <InputGroup.Append>
                        <AppButton type="submit" onClick={() => {}}>
                            <FontAwesomeIcon icon={faPaperPlane} /> Send
                        </AppButton>
                    </InputGroup.Append>
                </InputGroup>

                <AppButton type="submit" variant="link" onClick={onHide} classes={[styles.CancelLink]}>Cancel</AppButton>
            </Form>

            { isSuccess && <p className={styles.SuccessMsg}>Email sent successfully!</p>}
            { errorMsg && <p className={styles.ErrorMsg}>{errorMsg}</p>}
        </div>
    );
};

export default SendEmail;
