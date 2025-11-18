import { Category, QuestionAnswer, User } from './types';

export const MOCK_USER: User = {
    id: 'user-1',
    name: 'Alex Johnson',
    avatarUrl: 'https://picsum.photos/seed/alex/100/100'
};

export const CATEGORIES: Category[] = [
    { id: 'cat-1', name: 'React' },
    { id: 'cat-2', name: 'TypeScript' },
    { id: 'cat-3', name: 'Node.js' },
    { id: 'cat-4', name: 'DevOps' },
    { id: 'cat-5', name: 'Databases' },
    { id: 'cat-6', name: 'UI/UX' },
    { id: 'cat-7', name: 'Gemini API' },
];

export const INITIAL_KNOWLEDGE_BASE: QuestionAnswer[] = [
    {
        id: 'qa-1',
        question: 'How to handle state in large React applications?',
        answer: 'For large React applications, consider using state management libraries like Redux or Zustand. For simpler cases, React\'s built-in Context API combined with the useReducer hook can be a powerful solution. This helps in centralizing state and logic, making the application more maintainable and scalable.',
        category: CATEGORIES[0],
        author: { id: 'user-2', name: 'Jane Doe', avatarUrl: 'https://picsum.photos/seed/jane/100/100' },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    },
    {
        id: 'qa-2',
        question: 'What are the benefits of using TypeScript with React?',
        answer: 'TypeScript brings static typing to JavaScript. When used with React, it helps in catching errors early during development, improves code readability and maintainability through explicit type definitions, and provides excellent autocompletion and refactoring support in modern IDEs. This leads to more robust and less error-prone applications.',
        category: CATEGORIES[1],
        author: { id: 'user-3', name: 'Sam Wilson', avatarUrl: 'https://picsum.photos/seed/sam/100/100' },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    },
    {
        id: 'qa-3',
        question: 'How to make a streaming request with the Gemini API?',
        answer: 'To make a streaming request, use the `ai.models.generateContentStream()` method. You can then iterate over the response stream using a `for await...of` loop to process each chunk as it arrives. This is useful for long-running generations where you want to display partial results to the user progressively.',
        category: CATEGORIES[6],
        author: MOCK_USER,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    }
];