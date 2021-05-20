import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from './AppButton.module.scss';

const AppButton = ({ children, variant, type, onClick, classes }) => {
    return (
        <Button type={type}
                variant={variant}
                onClick={onClick}
                className={[styles.Button, ...classes].join(' ')}>
            { children }
        </Button>
    );
};

AppButton.defaultProps = {
    variant: 'primary',
    type: 'button',
    classes: [],
    onClick: () => {},
};

export default AppButton;
