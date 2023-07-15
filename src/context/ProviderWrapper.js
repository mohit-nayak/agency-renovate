import React from "react";
import { Provider as AppProvider } from './AppContext';
import { Provider as AuthProvider } from './AuthContext';
import { Provider as ProjectProvider } from './ProjectContext';
import { Provider as QuoteProvider } from './QuoteContext';

const ProviderWrapper = ({ children }) => {
    return (
        <AppProvider>
            <AuthProvider>
                <ProjectProvider>
                    <QuoteProvider>
                        { children }
                    </QuoteProvider>
                </ProjectProvider>
            </AuthProvider>
        </AppProvider>
    );
};

export default ProviderWrapper;