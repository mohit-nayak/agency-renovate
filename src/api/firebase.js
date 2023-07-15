import { database } from '../config/firebase';

// Start listening for changes in projects data in database.
export const startListeningForProjectDataChange = (storeData) => {
    database()
        .ref('projects/')
        .on('value', snapshot => {
            return storeData(snapshot.val());
        });
};

// Start listening for changes in quotes data in database.
export const startListeningForQuoteDataChange = (storeData) => {
    database()
        .ref('quotes/')
        .on('value', snapshot => {
            return storeData(snapshot.val());
        });
}

// Create new project.
export const createProject = (projectMode, data) => {
    const node = projectMode === "top" ? "topProjects" : "recentProjects";
    database()
        .ref('projects/')
        .child(node)
        .push()
        .set(data)
        .then(res => res);
};

// Update an existing project.
export const updateProject = (projectMode, id, data, callback) => {
    const node = projectMode === "top" ? "topProjects" : "recentProjects";
    database()
        .ref('projects/')
        .child(`${node}/${id}`)
        .set(data)
        .then(res => {
            if (callback) callback();
            return res;
        });
};

// Delete a project.
export const deleteProject = (projectMode, id) => {
    const node = projectMode === "top" ? "topProjects" : "recentProjects";
    database()
        .ref('projects/')
        .child(`${node}/${id}`)
        .remove()
        .then(res => res);
};

// Get data on a specific node.
export const getDataAt = (fullPath) => {
    return database()
        .ref(fullPath)
        .get()
        .then(snapshot => {
            return snapshot.val();
        });
};

