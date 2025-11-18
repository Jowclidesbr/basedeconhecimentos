import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const LoginScreen: React.FC = () => {
    const { login } = useAppContext();
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            login(name.trim());
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md p-8 space-y-8 bg-surface rounded-xl shadow-2xl">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-text-primary">Welcome to the Team Knowledge Base</h1>
                    <p className="mt-2 text-text-secondary">Enter your name to continue</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-text-secondary">
                            Your Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 bg-background border rounded-lg border-border-color focus:ring-2 focus:ring-accent focus:border-accent"
                            placeholder="e.g., Alex Johnson"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-5 py-3 font-semibold text-white transition-colors duration-300 rounded-lg bg-primary hover:bg-secondary disabled:bg-slate-600 disabled:cursor-not-allowed"
                        disabled={!name.trim()}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginScreen;