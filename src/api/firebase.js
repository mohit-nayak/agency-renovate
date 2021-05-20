import { database } from '../config/firebase';

export const startListeningForProjectDataChange = (storeData) => {
    database()
        .ref('projects/')
        .on('value', snapshot => {
            return storeData(snapshot.val());
        });
};

export const createProject = (projectMode, data) => {
    const node = projectMode === "top" ? "topProjects" : "recentProjects";
    database()
        .ref('projects/')
        .child(node)
        .push()
        .set(data)
        .then(res => res);
};