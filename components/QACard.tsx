
import React, { useState } from 'react';
import { QuestionAnswer } from '../types';
import CategoryPill from './CategoryPill';
import { useAppContext } from '../context/AppContext';
import { draftAnswer } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import ReactMarkdown from 'react-markdown';

const QACard: React.FC<{ qa: QuestionAnswer }> = ({ qa }) => {
    const { user, updateQA, deleteQA } = useAppContext();
    const [isAnswerVisible, setIsAnswerVisible] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedAnswer, setEditedAnswer] = useState(qa.answer);
    const [isGenerating, setIsGenerating] = useState(false);
    const [tone, setTone] = useState('Expert');
    const [length, setLength] = useState('Medium');

    const isAuthor = user?.id === qa.author.id;

    const handleGenerateDraft = async () => {
        setIsGenerating(true);
        const newAnswer = await draftAnswer(qa.question, tone, length);
        setEditedAnswer(newAnswer);
        setIsGenerating(false);
    };

    const handleSave = () => {
        updateQA(qa.id, { answer: editedAnswer });
        setIsEditing(false);
    };
    
    const handleDelete = () => {
        if(window.confirm('Are you sure you want to delete this entry?')) {
            deleteQA(qa.id);
        }
    }

    return (
        <article className="overflow-hidden transition-all duration-300 transform border rounded-lg shadow-lg bg-surface border-border-color hover:shadow-accent/20 hover:scale-[1.01]">
            <div className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <CategoryPill category={qa.category} />
                        <h2 className="mt-3 text-xl font-bold text-text-primary">{qa.question}</h2>
                    </div>
                    <button onClick={() => setIsAnswerVisible(!isAnswerVisible)} className="p-2 ml-4 rounded-full hover:bg-slate-700">
                        <ChevronDownIcon className={`w-6 h-6 transition-transform duration-300 ${isAnswerVisible ? '' : '-rotate-90'}`} />
                    </button>
                </div>
                
                {isAnswerVisible && (
                    <div className="mt-4">
                        {isEditing ? (
                            <div className="space-y-4">
                                <textarea
                                    className="w-full h-48 p-3 text-base bg-background border rounded-md border-border-color focus:ring-accent focus:border-accent"
                                    value={editedAnswer}
                                    onChange={(e) => setEditedAnswer(e.target.value)}
                                />
                                <div className="flex flex-wrap items-end justify-between gap-4">
                                    {/* Left Side: AI Controls */}
                                    <div className="flex flex-wrap items-end gap-2">
                                        <div>
                                            <label htmlFor={`tone-select-${qa.id}`} className="block mb-1 text-xs font-medium text-text-secondary">Tone</label>
                                            <select id={`tone-select-${qa.id}`} value={tone} onChange={(e) => setTone(e.target.value)} className="px-2 py-2 text-sm rounded-md bg-background border-border-color focus:ring-accent focus:border-accent">
                                                <option>Expert</option>
                                                <option>Formal</option>
                                                <option>Informal</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor={`length-select-${qa.id}`} className="block mb-1 text-xs font-medium text-text-secondary">Length</label>
                                            <select id={`length-select-${qa.id}`} value={length} onChange={(e) => setLength(e.target.value)} className="px-2 py-2 text-sm rounded-md bg-background border-border-color focus:ring-accent focus:border-accent">
                                                <option>Short</option>
                                                <option>Medium</option>
                                                <option>Detailed</option>
                                            </select>
                                        </div>
                                        <button
                                            onClick={handleGenerateDraft}
                                            disabled={isGenerating}
                                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 rounded-md bg-accent hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed"
                                        >
                                            <SparklesIcon className="w-4 h-4" />
                                            {isGenerating ? 'Generating...' : 'Draft with AI'}
                                        </button>
                                    </div>
                                    {/* Right Side: Action Buttons */}
                                    <div className="space-x-2">
                                        <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm font-medium rounded-md bg-slate-600 hover:bg-slate-500">Cancel</button>
                                        <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white rounded-md bg-primary hover:bg-secondary">Save</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                             <div className="prose prose-invert max-w-none prose-p:text-text-secondary prose-headings:text-text-primary prose-strong:text-text-primary">
                                <ReactMarkdown>{qa.answer}</ReactMarkdown>
                             </div>
                        )}
                    </div>
                )}
            </div>
            <div className="flex items-center justify-between px-6 py-4 bg-slate-800/50">
                <div className="flex items-center space-x-3">
                    <img src={qa.author.avatarUrl} alt={qa.author.name} className="w-8 h-8 rounded-full" />
                    <div>
                        <p className="text-sm font-medium text-text-primary">{qa.author.name}</p>
                        <p className="text-xs text-text-secondary">{qa.createdAt.toLocaleDateString()}</p>
                    </div>
                </div>
                {isAuthor && !isEditing && (
                    <div className="space-x-2">
                        <button onClick={() => setIsEditing(true)} className="px-3 py-1 text-xs font-medium rounded-md bg-slate-700 hover:bg-slate-600">Edit</button>
                        <button onClick={handleDelete} className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-500">Delete</button>
                    </div>
                )}
            </div>
        </article>
    );
};

export default QACard;