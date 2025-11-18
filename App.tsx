
import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import LoginScreen from './components/LoginScreen';
import KnowledgeBase from './components/KnowledgeBase';
import Header from './components/Header';

const AppContent: React.FC = () => {
    const { user } = useAppContext();

    return (
        <div className="min-h-screen bg-background text-text-primary">
            {user ? (
                <>
                    <Header />
                    <main className="p-4 sm:p-6 lg:p-8">
                        <KnowledgeBase />
                    </main>
                </>
            ) : (
                <LoginScreen />
            )}
        </div>
    );
};

const App: React.FC = () => {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    );
};

export default App;
