export interface User {
  id: string;
  name: string;
  avatarUrl: string; // URL for the user's profile picture
}

export interface QuestionAnswer {
  id: string;
  question: string;
  answer: string;
  category: Category;
  author: User;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
}

export interface AppContextType {
  user: User | null;
  login: (name: string) => void;
  logout: () => void;
  knowledgeBase: QuestionAnswer[];
  categories: Category[];
  addQA: (qa: Omit<QuestionAnswer, 'id' | 'author' | 'createdAt'>) => void;
  updateQA: (id: string, updates: Partial<QuestionAnswer>) => void;
  deleteQA: (id: string) => void;
}