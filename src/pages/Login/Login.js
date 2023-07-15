import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import AuthForm from '../../components/AuthForm/AuthForm';
import styles from './Login.module.scss';

const Login = () => {
    const history = useHistory();

    useEffect(() => {
        history.push('/');
        // eslint-disable-next-line
    }, []);

    return (
        <div className={styles.Wrapper}>
            <div className={styles.HeadingContainer}>
                <img src={Logo} className={styles.Logo} alt="Logo" />
                <h5 className={styles.Title}>Admin Login</h5>
            </div>
            <AuthForm />
        </div>
    );
};

export default Login;
