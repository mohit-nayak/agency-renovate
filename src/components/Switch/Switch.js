import React from 'react';
import styles from './Switch.module.scss';

const Switch = ({ leftText, rightText, val, onChange }) => {

    return (
        <div className={styles.SwitchField}>
            <input type="radio" id="radio-one" name="switch-one" value={leftText} onChange={e => onChange(e.target.value)} defaultChecked />
            <label htmlFor="radio-one">{leftText}</label>
            <input type="radio" id="radio-two" name="switch-one" value={rightText} onChange={e => onChange(e.target.value)} />
            <label htmlFor="radio-two">{rightText}</label>
        </div>
    );
};

export default Switch;
