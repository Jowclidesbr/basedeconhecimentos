
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import QACard from './QACard';
import NewQAForm from './NewQAForm';
import CategoryPill from './CategoryPill';
import { PlusIcon } from './icons/PlusIcon';
import { SearchIcon } from './icons/SearchIcon';
import { Category } from '../types';

const KnowledgeBase: React.FC = () => {
    const { knowledgeBase, categories } = useAppContext();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const filteredKnowledgeBase = useMemo(() => {
        return knowledgeBase
            .filter(qa => {
                if (selectedCategory && qa.category.id !== selectedCategory.id) {
                    return false;
                }
                if (searchTerm) {
                    const lowerSearch = searchTerm.toLowerCase();
                    return (
                        qa.question.toLowerCase().includes(lowerSearch) ||
                        qa.answer.toLowerCase().includes(lowerSearch)
                    );
                }
                return true;
            })
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }, [knowledgeBase, searchTerm, selectedCategory]);

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
                <div className="relative flex-grow">
                    <SearchIcon className="absolute w-5 h-5 left-3 top-3.5 text-text-secondary" />
                    <input
                        type="text"
                        placeholder="Search questions and answers..."
                        className="w-full py-3 pl-10 pr-4 rounded-lg bg-surface border-border-color focus:ring-2 focus:ring-accent focus:border-accent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center justify-center gap-2 px-5 py-3 font-semibold text-white transition-colors duration-300 rounded-lg bg-primary hover:bg-secondary whitespace-nowrap"
                >
                    <PlusIcon className="w-5 h-5" />
                    Add Entry
                </button>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 mb-8">
                <span className="mr-2 font-medium text-text-secondary">Categories:</span>
                <CategoryPill
                    category={{ id: 'all', name: 'All' }}
                    isActive={!selectedCategory}
                    onClick={() => setSelectedCategory(null)}
                />
                {categories.map(cat => (
                    <CategoryPill
                        key={cat.id}
                        category={cat}
                        isActive={selectedCategory?.id === cat.id}
                        onClick={() => setSelectedCategory(cat)}
                    />
                ))}
            </div>

            <div className="space-y-6">
                {filteredKnowledgeBase.length > 0 ? (
                    filteredKnowledgeBase.map(qa => <QACard key={qa.id} qa={qa} />)
                ) : (
                    <div className="py-20 text-center rounded-lg bg-surface">
                        <h3 className="text-xl font-semibold text-text-primary">No Entries Found</h3>
                        <p className="mt-2 text-text-secondary">Try adjusting your search or filters, or add a new entry!</p>
                    </div>
                )}
            </div>

            {isFormOpen && <NewQAForm onClose={() => setIsFormOpen(false)} />}
        </div>
    );
};

export default KnowledgeBase;
