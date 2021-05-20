import React, { useState, useEffect, useContext } from 'react';
import AppButton from "../../components/AppButton/AppButton";
import CreateUpdateProjectModal from "../../components/CreateUpdateProjectModal/CreateUpdateProjectModal";
import ProjectsList from "../../components/ProjectsList/ProjectsList";
import { Context as appContext } from '../../context/AppContext';
import { Context as projectContext } from '../../context/ProjectContext';
import * as api from '../../api/firebase';
import styles from './Projects.module.scss';

const Projects = () => {
    const [projectMode, setProjectMode] = useState("top");
    const [showModal, setShowModal] = useState(false);
    const { startLoading, stopLoading } = useContext(appContext);
    const { state: { topProjects, recentProjects }, setProjects } = useContext(projectContext);

    const onSubmit = (data) => {
        startLoading();
        api.createProject(projectMode, data);
        setShowModal(false);
    };

    const storeResponse = data => {
        console.log("data", data);
        setProjects(data);
        stopLoading();
    };

    useEffect(() => {
        api.startListeningForProjectDataChange(storeResponse);
        // eslint-disable-next-line
    }, []);

    return (
        <div className={styles.Wrapper}>
            <h1 style={{ textAlign: "center" }}>Projects page!</h1>
            <AppButton onClick={() => setShowModal(true)}>Create project</AppButton>

            <CreateUpdateProjectModal show={showModal}
                                      onHide={() => setShowModal(false)}
                                      randomizeName={false}
                                      onSubmit={onSubmit}
            />

            <ProjectsList topProjects={topProjects} recentProjects={recentProjects} mode={projectMode} />
        </div>
    );
};

export default Projects;
