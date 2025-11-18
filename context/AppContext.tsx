import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { User, QuestionAnswer, Category, AppContextType, GoogleCredentialPayload } from '../types';
import { CATEGORIES, INITIAL_KNOWLEDGE_BASE } from '../constants';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [knowledgeBase, setKnowledgeBase] = useState<QuestionAnswer[]>(INITIAL_KNOWLEDGE_BASE);

    const login = (payload: GoogleCredentialPayload) => {
        const newUser: User = {
            id: payload.sub,
            name: payload.name,
            email: payload.email,
            avatarUrl: payload.picture,
        };
        setUser(newUser);
    };

    const logout = () => {
        // @ts-ignore
        if (window.google) {
            // @ts-ignore
            window.google.accounts.id.disableAutoSelect();
        }
        setUser(null);
    };

    const addQA = useCallback((qa: Omit<QuestionAnswer, 'id' | 'author' | 'createdAt'>) => {
        if (!user) return;
        const newQA: QuestionAnswer = {
            ...qa,
            id: `qa-${Date.now()}`,
            author: user,
            createdAt: new Date(),
        };
        setKnowledgeBase(prev => [newQA, ...prev]);
    }, [user]);

    const updateQA = useCallback((id: string, updates: Partial<QuestionAnswer>) => {
        setKnowledgeBase(prev => 
            prev.map(qa => qa.id === id ? { ...qa, ...updates } : qa)
        );
    }, []);

    const deleteQA = useCallback((id: string) => {
        setKnowledgeBase(prev => prev.filter(qa => qa.id !== id));
    }, []);


    const value: AppContextType = {
        user,
        login,
        logout,
        knowledgeBase,
        categories: CATEGORIES,
        addQA,
        updateQA,
        deleteQA
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};