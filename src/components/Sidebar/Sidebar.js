import React, { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import AppButton from '../../components/AppButton/AppButton';
import Logo from '../../assets/images/logo.png';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faCog, faQuestionCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Context as appContext } from '../../context/AppContext';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
    const { state: { sidebarActive }, hideSidebar } = useContext(appContext);

    return (
        <>
            <div className={[styles.SidebarWrapper, sidebarActive ? styles.Active : ''].join(' ')}>
                <div className={styles.Header}>
                    <NavLink to="/">
                        <img src={Logo} className={styles.Logo} alt="Logo" />
                    </NavLink>
                    <p className={styles.Title}>Hi Admin!</p>
                </div>

                <Nav className={styles.Sidebar}
                     activeKey="/home"
                     onSelect={selectedKey => alert(`selected ${selectedKey}`)}>
                    <Nav.Item>
                        <NavLink to="/" className={styles.NavLink}>
                            <FontAwesomeIcon icon={faList} className={styles.Icon} /> Projects
                        </NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink to="/quotes" className={styles.NavLink}>
                            <FontAwesomeIcon icon={faQuestionCircle} className={styles.Icon} /> Queries
                        </NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink to="/settings" className={styles.NavLink}>
                            <FontAwesomeIcon icon={faCog} className={styles.Icon} /> Settings
                        </NavLink>
                    </Nav.Item>
                </Nav>

                <div className={styles.Footer}>
                    <AppButton variant="link" classes={[styles.LogoutBtn]}>
                        Sign out
                        <FontAwesomeIcon icon={faSignOutAlt} className={styles.Icon} />
                    </AppButton>
                </div>
            </div>
            <div className={styles.Overlay} onClick={hideSidebar} />
        </>
    );
};

export default Sidebar;
