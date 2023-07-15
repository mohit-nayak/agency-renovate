import React, { useState, useEffect, useContext } from 'react';
import AppButton from "../../components/AppButton/AppButton";
import Switch from "../../components/Switch/Switch";
import CreateUpdateProjectModal from "../../components/CreateUpdateProjectModal/CreateUpdateProjectModal";
import ProjectsList from "../../components/ProjectsList/ProjectsList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { Context as appContext } from '../../context/AppContext';
import { Context as projectContext } from '../../context/ProjectContext';
import * as api from '../../api/firebase';
import styles from './Projects.module.scss';

const Projects = () => {
    const [activeProjectID, setActiveProjectID] = useState(null);
    const [activeProjectData, setActiveProjectData] = useState(null);
    const [projectMode, setProjectMode] = useState("top");
    const [showModal, setShowModal] = useState(false);
    const { startLoading, stopLoading } = useContext(appContext);
    const { state: { topProjects, recentProjects }, setProjects } = useContext(projectContext);

    // Enable project edit mode.
    const editProjectHandler = (id, data) => {
        setActiveProjectID(id);
        setActiveProjectData({...data});
        setShowModal(true);
    };

    // Update image for existing project.
    const onImageChanged = (filename, fileUrl) => {
        if (activeProjectData) {
            const updatedData = {
                ...activeProjectData,
                previewFileName: filename,
                previewDownloadUrl: fileUrl,
            }

            setActiveProjectData({ ...updatedData });
            api.updateProject(projectMode, activeProjectID, updatedData);

            stopLoading();
        }
    };

    // Create update project in database.
    const onSubmitHandler = (formData) => {
        startLoading();
        if (activeProjectID && activeProjectData) {
            api.updateProject(projectMode, activeProjectID, formData, stopLoading);
        }
        else {
            api.createProject(projectMode, formData);
        }

        hideModalHandler();
    };

    // Delete file from Firebase storage.
    const onDeleteHandler = (id) => {
        startLoading();
        api.deleteProject(projectMode, id);
    };

    // Hide modal and clear fields.
    const hideModalHandler = () => {
        setShowModal(false);
        setActiveProjectID(null);
        setActiveProjectData(null);
    };

    // Store response each time data updated at backend.
    const storeResponse = data => {
        setProjects(data);
        stopLoading();
    };

    // Start listening for data updates at backend.
    useEffect(() => {
        startLoading();
        api.startListeningForProjectDataChange(storeResponse);
        // eslint-disable-next-line
    }, []);

    return (
        <div className={styles.Wrapper}>
            <div className={styles.ActionBar}>
                <h4 className={styles.Title}>Projects</h4>
                <div className='d-flex align-items-center'>
                    <Switch leftText="top" rightText="recent" onChange={setProjectMode} />
                    <AppButton classes={['ml-3']} onClick={() => setShowModal(true)}>
                        <FontAwesomeIcon icon={faLeaf} /> New
                    </AppButton>
                </div>
            </div>

            <CreateUpdateProjectModal show={showModal}
                                      data={activeProjectData}
                                      onHide={hideModalHandler}
                                      onImageChanged={onImageChanged}
                                      onSubmit={onSubmitHandler}
            />

            <ProjectsList mode={projectMode}
                          topProjects={topProjects}
                          recentProjects={recentProjects}
                          onEdit={editProjectHandler}
                          onDelete={onDeleteHandler}
            />
        </div>
    );
};

export default Projects;
