import React from "react";
import { Provider as AppProvider } from './AppContext';
import { Provider as AuthProvider } from './AuthContext';
import { Provider as ProjectProvider } from './ProjectContext';

const ProviderWrapper = ({ children }) => {
    return (
        <AppProvider>
            <AuthProvider>
                <ProjectProvider>
                    { children }
                </ProjectProvider>
            </AuthProvider>
        </AppProvider>
    );
};

export default ProviderWrapper;