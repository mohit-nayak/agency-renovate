import React from 'react';
import CreateUserForm from "../../components/CreateUserForm/CreateUserForm";
import styles from './Settings.module.scss';

const Settings = () => {
    return (
        <div className={styles.Wrapper}>
            <h4 className={styles.Title}>Settings</h4>
            <CreateUserForm />
        </div>
    );
};

export default Settings;
