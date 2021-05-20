import React from 'react';
import ProjectTile from "../ProjectTile/ProjectTile";
import styles from './ProjectsList.module.scss';

const ProjectsListProjectsList = ({ topProjects, recentProjects, mode }) => {
    const projects = mode === "top" ? topProjects : recentProjects;

    return (
        <div>
            { projects && Object.keys(projects).reverse().map(key => {
               return <ProjectTile project={projects[key]} key={key} />
            }) }

            { !projects && <p>No projects found!</p> }
        </div>
    );
};

export default ProjectsListProjectsList;
