import type { User, Company, Concessionaire, Product, Project, Schedule, DashboardData } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const authService = {
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Credenciais inválidas');
    }

    const result = await response.json();
    return result.data;
  },

  async getCurrentUser(): Promise<User> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Não autenticado');
    }

    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Não autenticado');
    }

    const result = await response.json();
    return result.data;
  },
};

export const companyService = {
  async getAll(): Promise<Company[]> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/companies`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar empresas');
    }

    const result = await response.json();
    return result.data;
  },

  async create(company: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>): Promise<Company> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/companies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(company),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar empresa');
    }

    const result = await response.json();
    return result.data;
  },
};

export const concessionaireService = {
  async getAll(): Promise<Concessionaire[]> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/concessionaires`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar concessionárias');
    }

    const result = await response.json();
    return result.data;
  },

  async create(concessionaire: Omit<Concessionaire, 'id' | 'createdAt' | 'updatedAt'>): Promise<Concessionaire> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/concessionaires`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(concessionaire),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar concessionária');
    }

    const result = await response.json();
    return result.data;
  },
};

export const productService = {
  async getAll(): Promise<Product[]> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/products`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar produtos');
    }

    const result = await response.json();
    return result.data;
  },
};

export const projectService = {
  async getAll(): Promise<Project[]> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/projects`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar projetos');
    }

    const result = await response.json();
    return result.data;
  },

  async create(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(project),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar projeto');
    }

    const result = await response.json();
    return result.data;
  },

  async update(id: string, project: Partial<Project>): Promise<Project> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(project),
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar projeto');
    }

    const result = await response.json();
    return result.data;
  },

  async delete(id: string): Promise<void> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao deletar projeto');
    }
  },
};

export const scheduleService = {
  async getByProjectId(projectId: string): Promise<Schedule> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/schedules/${projectId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar cronograma');
    }

    const result = await response.json();
    return result.data;
  },
};

export const dashboardService = {
  async getDashboard(): Promise<DashboardData> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/dashboard`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar dados do dashboard');
    }

    const result = await response.json();
    return result.data;
  },
};