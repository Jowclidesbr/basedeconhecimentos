export interface User {
  id: string; // Google's 'sub'
  name: string;
  email: string;
  avatarUrl: string; // Google's 'picture'
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

export interface GoogleCredentialPayload {
    sub: string;
    name: string;
    email: string;
    picture: string;
}

export interface AppContextType {
  user: User | null;
  login: (payload: GoogleCredentialPayload) => void;
  logout: () => void;
  knowledgeBase: QuestionAnswer[];
  categories: Category[];
  addQA: (qa: Omit<QuestionAnswer, 'id' | 'author' | 'createdAt'>) => void;
  updateQA: (id: string, updates: Partial<QuestionAnswer>) => void;
  deleteQA: (id: string) => void;
}