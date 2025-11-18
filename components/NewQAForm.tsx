
import React, { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import { Category } from '../types';
import { suggestCategories } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import CategoryPill from './CategoryPill';

interface NewQAFormProps {
    onClose: () => void;
}

const NewQAForm: React.FC<NewQAFormProps> = ({ onClose }) => {
    const { categories, addQA } = useAppContext();
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [suggestedCategories, setSuggestedCategories] = useState<Category[]>([]);
    const [isSuggesting, setIsSuggesting] = useState(false);

    const fetchSuggestions = useCallback(async (currentQuestion: string) => {
        if (currentQuestion.length < 20) {
            setSuggestedCategories([]);
            return;
        }
        setIsSuggesting(true);
        const suggestions = await suggestCategories(currentQuestion, categories);
        setSuggestedCategories(suggestions);
        setIsSuggesting(false);
    }, [categories]);

    useEffect(() => {
        const handler = setTimeout(() => {
            fetchSuggestions(question);
        }, 1000); // Debounce API call

        return () => {
            clearTimeout(handler);
        };
    }, [question, fetchSuggestions]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (question && answer && selectedCategory) {
            addQA({ question, answer, category: selectedCategory });
            onClose();
        } else {
            alert('Please fill out all fields and select a category.');
        }
    };
    
    const handleCategorySelect = (category: Category) => {
        setSelectedCategory(category);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
            <div className="w-full max-w-2xl p-8 space-y-6 transform bg-surface rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-text-primary">Add New Knowledge Entry</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-text-secondary hover:bg-slate-700">&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="question" className="block mb-2 text-sm font-medium text-text-secondary">Question</label>
                        <input
                            id="question"
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="w-full p-3 bg-background border rounded-md border-border-color focus:ring-accent focus:border-accent"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block mb-2 text-sm font-medium text-text-secondary">Category</label>
                        <div className="p-4 border rounded-md bg-background border-border-color">
                           {suggestedCategories.length > 0 && (
                             <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2 text-sm text-accent">
                                    <SparklesIcon className="w-4 h-4"/>
                                    <span>Suggested Categories</span>
                                    {isSuggesting && <div className="w-3 h-3 border-2 rounded-full border-t-transparent animate-spin border-accent"></div>}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                     {suggestedCategories.map(cat => (
                                        <CategoryPill key={`sugg-${cat.id}`} category={cat} onClick={() => handleCategorySelect(cat)} isActive={selectedCategory?.id === cat.id} />
                                     ))}
                                </div>
                                <hr className="my-3 border-border-color" />
                             </div>
                           )}
                           <p className="mb-2 text-xs text-text-secondary">All Categories</p>
                           <div className="flex flex-wrap gap-2">
                                {categories.map(cat => (
                                    <CategoryPill key={cat.id} category={cat} onClick={() => handleCategorySelect(cat)} isActive={selectedCategory?.id === cat.id} />
                                ))}
                           </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="answer" className="block mb-2 text-sm font-medium text-text-secondary">Answer</label>
                        <textarea
                            id="answer"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="w-full h-32 p-3 bg-background border rounded-md border-border-color focus:ring-accent focus:border-accent"
                            required
                        />
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="px-5 py-2 font-semibold rounded-lg bg-slate-600 hover:bg-slate-500">
                            Cancel
                        </button>
                        <button type="submit" className="px-5 py-2 font-semibold text-white rounded-lg bg-primary hover:bg-secondary">
                            Submit Entry
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewQAForm;
