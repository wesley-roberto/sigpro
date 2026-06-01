import React, { useEffect, useState } from 'react';
import { dashboardService } from '../services/api';
import type { DashboardData } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const DashboardPage: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await dashboardService.getDashboard();
        const data = (response as unknown as { data: DashboardData }).data;
        setDashboardData(data);
      } catch (err) {
        setError('Erro ao carregar dados do dashboard');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'nao-iniciado': '#9CA3AF',
      'em-andamento': '#3B82F6',
      'em-analise': '#8B5CF6',
      'em-correcao': '#F59E0B',
      'aguardando-aprovacao': '#EAB308',
      'aprovado': '#10B981',
      'entregue': '#059669',
      'atrasado': '#EF4444',
      'cancelado': '#6B7280',
    };
    return colors[status] || '#6B7280';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!dashboardData) {
    return <div>Nenhum dado disponível</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Executivo</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total de Projetos</h3>
          <p className="text-3xl font-bold text-primary-900">{dashboardData.totalProjects}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Projetos Entregues</h3>
          <p className="text-3xl font-bold text-success-600">{dashboardData.deliveredProjects}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Projetos Em Análise</h3>
          <p className="text-3xl font-bold text-purple-600">{dashboardData.analysisProjects}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Projetos Em Correção</h3>
          <p className="text-3xl font-bold text-orange-600">{dashboardData.correctionProjects}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Projetos Atrasados</h3>
          <p className="text-3xl font-bold text-red-600">{dashboardData.delayedProjects}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Projetos Concluídos</h3>
          <p className="text-3xl font-bold text-green-600">{dashboardData.completedProjects}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projects by Concessionaire */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Projetos por Concessionária</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.projectsByConcessionaire}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#0E2E5C" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Projects by Company */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Projetos por Empresa</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.projectsByCompany}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#0F8A4A" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Projects by Status */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status dos Projetos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dashboardData.projectsByStatus.map(item => ({
                  name: item.status.replace('-', ' '),
                  value: item.count,
                  color: getStatusColor(item.status)
                }))}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: { name?: string; percent?: number }) => `${name || ''} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {dashboardData.projectsByStatus.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={getStatusColor(_entry.status)} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Delivered vs Delayed */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Entregues vs Atrasados</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { name: 'Entregues', value: dashboardData.deliveredVsDelayed.delivered },
              { name: 'Atrasados', value: dashboardData.deliveredVsDelayed.delayed }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#059669" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;