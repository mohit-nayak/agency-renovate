import React, { useContext } from 'react';
import Logo from '../../assets/images/logo.png';
import AppButton from "../AppButton/AppButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Context as appContext } from '../../context/AppContext';
import styles from './MobileTopBar.module.scss';

const MobileTopBar = () => {
    const { showSidebar } = useContext(appContext);

    return (
        <div className={styles.Wrapper}>
            <AppButton variant="lnk" classes={[styles.SidebarOpenIcon]} onClick={showSidebar}>
                <FontAwesomeIcon icon={faBars} />
            </AppButton>

            <img src={Logo} className={styles.Logo} alt="Logo" />
        </div>
    );
};

export default MobileTopBar;
