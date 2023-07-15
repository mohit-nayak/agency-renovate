import React from 'react';
import ProjectTile from "../ProjectTile/ProjectTile";
import styles from './ProjectsList.module.scss';

const ProjectsListProjectsList = ({ topProjects, recentProjects, mode, onEdit, onDelete }) => {
    const projects = mode === "top" ? topProjects : recentProjects;

    return (
        <div className={styles.Wrapper}>
            { projects && Object.keys(projects).reverse().map(key => {
               return <ProjectTile key={key}
                                   id={key}
                                   project={projects[key]}
                                   onEdit={onEdit}
                                   onDelete={onDelete} />
            }) }

            { !projects && <h5 className={styles.NotFound}>No projects found!</h5> }
        </div>
    );
};

export default ProjectsListProjectsList;
