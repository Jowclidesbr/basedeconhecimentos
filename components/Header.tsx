
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { UserIcon } from './icons/UserIcon';

const Header: React.FC = () => {
    const { user, logout } = useAppContext();

    return (
        <header className="sticky top-0 z-30 w-full px-4 bg-surface/80 sm:px-6 lg:px-8 backdrop-blur-sm border-b border-border-color">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-2">
                     <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                    <h1 className="text-xl font-bold text-text-primary">Team Knowledge Base AI</h1>
                </div>
                {user && (
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                           {user.avatarUrl ? (
                             <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full" />
                           ) : (
                             <UserIcon className="w-8 h-8 text-text-secondary" />
                           )}
                           <span className="hidden font-medium sm:block text-text-secondary">{user.name}</span>
                        </div>
                        <button
                            onClick={logout}
                            className="px-3 py-2 text-sm font-medium rounded-md text-text-secondary bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-accent transition-colors duration-200"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
