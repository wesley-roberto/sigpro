export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

export interface Company {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Concessionaire {
  id: string;
  name: string;
  signatureDate: Date;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  type: 'unique' | 'monthly' | 'quarterly' | 'annual';
  deadline: number; // days
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  concessionaireId: string;
  productId: string;
  companyId: string;
  signatureDate: Date;
  contractualDeadline: Date;
  deliveryDeadline: Date;
  status: ProjectStatus;
  observations?: string;
  responsibleId: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type ProjectStatus = 
  | 'nao-iniciado'
  | 'em-andamento'
  | 'em-analise'
  | 'em-correcao'
  | 'aguardando-aprovacao'
  | 'aprovado'
  | 'entregue'
  | 'atrasado'
  | 'cancelado';

export interface Schedule {
  id: string;
  projectId: string;
  nextDelivery?: Date;
  remainingDays: number;
  delayedDays: number;
  contractualDeadline: number;
  completedPercentage: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardData {
  totalProjects: number;
  deliveredProjects: number;
  analysisProjects: number;
  correctionProjects: number;
  delayedProjects: number;
  completedProjects: number;
  projectsByConcessionaire: { name: string; count: number }[];
  projectsByCompany: { name: string; count: number }[];
  projectsByProduct: { name: string; count: number }[];
  projectsByStatus: { status: ProjectStatus; count: number }[];
  deliveredVsDelayed: { delivered: number; delayed: number };
  averageDeliveryTime: number;
  performanceByCompany: { name: string; performance: number }[];
  performanceByConcessionaire: { name: string; performance: number }[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}