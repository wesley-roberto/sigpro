import type { User, Company, Concessionaire, Product, Project, Schedule, DashboardData } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function apiFetch<T>(url: string, options?: RequestInit): Promise<T | null> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) return null;
    const result = await response.json();
    return result.data;
  } catch {
    return null;
  }
}

export const authService = {
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const mockUsers: User[] = [
      { id: '1', name: 'Administrador', email: 'admin@sigpro.com', password: 'admin123', role: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { id: '2', name: 'Gestor', email: 'gestor@sigpro.com', password: 'gestor123', role: 'manager', createdAt: new Date(), updatedAt: new Date() }
    ];

    const backendResult = await apiFetch<{ user: User; token: string }>(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (backendResult) return backendResult;

    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Credenciais inválidas');

    const token = btoa(JSON.stringify({ id: user.id, email: user.email, role: user.role }));
    return { user, token };
  },

  async getCurrentUser(): Promise<User> {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Não autenticado');

    const backendResult = await apiFetch<User>(`${API_BASE_URL}/api/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (backendResult) return backendResult;

    const decoded = JSON.parse(atob(token));
    return {
      id: decoded.id,
      name: decoded.id === '1' ? 'Administrador' : 'Gestor',
      email: decoded.email,
      role: decoded.role,
      password: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  },
};

const mockCompanies: Company[] = [
  { id: '1', name: 'HOUER', description: 'Empresa especializada em análise de projetos', createdAt: new Date(), updatedAt: new Date() },
  { id: '2', name: 'SOLUÇÕES INFRA', description: 'Consultoria em infraestrutura', createdAt: new Date(), updatedAt: new Date() },
  { id: '3', name: 'INFRA S.A.', description: 'Análise de infraestrutura e obras', createdAt: new Date(), updatedAt: new Date() }
];

const mockConcessionaires: Concessionaire[] = [
  { id: '1', name: 'Motiva Pantanal', signatureDate: new Date('2025-12-31'), description: 'Concessionária de rodovia Pantanal', createdAt: new Date(), updatedAt: new Date() },
  { id: '2', name: 'ECO101 Capixaba', signatureDate: new Date('2025-12-31'), description: 'Concessionária ECO101 Capixaba', createdAt: new Date(), updatedAt: new Date() },
  { id: '3', name: 'Autopista Fluminense', signatureDate: new Date('2026-02-27'), description: 'Concessionária Autopista Fluminense', createdAt: new Date(), updatedAt: new Date() }
];

const mockProducts: Product[] = [
  { id: '1', name: 'Relatório de Planejamento', description: 'P1 - Relatório de Planejamento', type: 'unique', deadline: 90, createdAt: new Date(), updatedAt: new Date() },
  { id: '2', name: 'Relatório de Metodologia / Manual VI', description: 'P2 - Relatório de Metodologia / Manual VI', type: 'unique', deadline: 90, createdAt: new Date(), updatedAt: new Date() },
  { id: '3', name: 'Relatório Mensal de Levantamento', description: 'P3 - Relatório Mensal de Levantamento', type: 'monthly', deadline: 30, createdAt: new Date(), updatedAt: new Date() },
  { id: '4', name: 'Relatório Anual de Avaliação de Parâmetros', description: 'P4 - Relatório Anual de Avaliação de Parâmetros', type: 'annual', deadline: 365, createdAt: new Date(), updatedAt: new Date() },
  { id: '5', name: 'Relatório Trimestral de Avaliação de Obras', description: 'P5 - Relatório Trimestral de Avaliação de Obras', type: 'quarterly', deadline: 90, createdAt: new Date(), updatedAt: new Date() },
  { id: '6', name: 'Relatório Mensal Técnico de Deslocamentos', description: 'P6 - Relatório Mensal Técnico de Deslocamentos', type: 'monthly', deadline: 30, createdAt: new Date(), updatedAt: new Date() }
];

const mockDashboardData: DashboardData = {
  totalProjects: 25,
  deliveredProjects: 8,
  analysisProjects: 5,
  correctionProjects: 3,
  delayedProjects: 2,
  completedProjects: 15,
  projectsByConcessionaire: [
    { name: 'Motiva Pantanal', count: 8 },
    { name: 'ECO101 Capixaba', count: 6 },
    { name: 'Autopista Fluminense', count: 11 }
  ],
  projectsByCompany: [
    { name: 'HOUER', count: 10 },
    { name: 'SOLUÇÕES INFRA', count: 8 },
    { name: 'INFRA S.A.', count: 7 }
  ],
  projectsByProduct: [
    { name: 'P1', count: 3 }, { name: 'P2', count: 3 }, { name: 'P3', count: 5 },
    { name: 'P4', count: 2 }, { name: 'P5', count: 4 }, { name: 'P6', count: 8 }
  ],
  projectsByStatus: [
    { status: 'nao-iniciado', count: 5 }, { status: 'em-andamento', count: 7 },
    { status: 'em-analise', count: 5 }, { status: 'em-correcao', count: 3 },
    { status: 'aguardando-aprovacao', count: 2 }, { status: 'aprovado', count: 1 },
    { status: 'entregue', count: 8 }, { status: 'atrasado', count: 2 }, { status: 'cancelado', count: 0 }
  ],
  deliveredVsDelayed: { delivered: 8, delayed: 2 },
  averageDeliveryTime: 45,
  performanceByCompany: [
    { name: 'HOUER', performance: 85 },
    { name: 'SOLUÇÕES INFRA', performance: 92 },
    { name: 'INFRA S.A.', performance: 78 }
  ],
  performanceByConcessionaire: [
    { name: 'Motiva Pantanal', performance: 88 },
    { name: 'ECO101 Capixaba', performance: 85 },
    { name: 'Autopista Fluminense', performance: 82 }
  ]
};

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

export const companyService = {
  async getAll(): Promise<Company[]> {
    const data = await apiFetch<Company[]>(`${API_BASE_URL}/api/companies`, { headers: authHeaders() });
    return data || mockCompanies;
  },

  async create(company: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>): Promise<Company> {
    const data = await apiFetch<Company>(`${API_BASE_URL}/api/companies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(company),
    });
    if (data) return data;
    const newCompany: Company = { ...company, id: Date.now().toString(), createdAt: new Date(), updatedAt: new Date() };
    mockCompanies.push(newCompany);
    return newCompany;
  },
};

export const concessionaireService = {
  async getAll(): Promise<Concessionaire[]> {
    const data = await apiFetch<Concessionaire[]>(`${API_BASE_URL}/api/concessionaires`, { headers: authHeaders() });
    return data || mockConcessionaires;
  },

  async create(concessionaire: Omit<Concessionaire, 'id' | 'createdAt' | 'updatedAt'>): Promise<Concessionaire> {
    const data = await apiFetch<Concessionaire>(`${API_BASE_URL}/api/concessionaires`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(concessionaire),
    });
    if (data) return data;
    const newConcessionaire: Concessionaire = { ...concessionaire, id: Date.now().toString(), createdAt: new Date(), updatedAt: new Date() };
    mockConcessionaires.push(newConcessionaire);
    return newConcessionaire;
  },
};

export const productService = {
  async getAll(): Promise<Product[]> {
    const data = await apiFetch<Product[]>(`${API_BASE_URL}/api/products`, { headers: authHeaders() });
    return data || mockProducts;
  },
};

let mockProjects: Project[] = [];

export const projectService = {
  async getAll(): Promise<Project[]> {
    const data = await apiFetch<Project[]>(`${API_BASE_URL}/api/projects`, { headers: authHeaders() });
    return data || mockProjects;
  },

  async create(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const data = await apiFetch<Project>(`${API_BASE_URL}/api/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(project),
    });
    if (data) return data;
    const newProject: Project = { ...project, id: Date.now().toString(), createdAt: new Date(), updatedAt: new Date() };
    mockProjects.push(newProject);
    return newProject;
  },

  async update(id: string, project: Partial<Project>): Promise<Project> {
    const data = await apiFetch<Project>(`${API_BASE_URL}/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(project),
    });
    if (data) return data;
    const index = mockProjects.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Projeto não encontrado');
    mockProjects[index] = { ...mockProjects[index], ...project, updatedAt: new Date() };
    return mockProjects[index];
  },

  async delete(id: string): Promise<void> {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) return;
    } catch {}
    const index = mockProjects.findIndex(p => p.id === id);
    if (index !== -1) mockProjects.splice(index, 1);
  },
};

export const scheduleService = {
  async getByProjectId(projectId: string): Promise<Schedule> {
    const data = await apiFetch<Schedule>(`${API_BASE_URL}/api/schedules/${projectId}`, { headers: authHeaders() });
    if (data) return data;
    return {
      id: '1',
      projectId,
      nextDelivery: new Date(),
      remainingDays: 30,
      delayedDays: 0,
      contractualDeadline: 90,
      completedPercentage: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  },
};

export const dashboardService = {
  async getDashboard(): Promise<DashboardData> {
    const data = await apiFetch<DashboardData>(`${API_BASE_URL}/api/dashboard`, { headers: authHeaders() });
    return data || mockDashboardData;
  },
};