import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { companyService, concessionaireService, productService } from '../services/api';

const ProjectRegisterPage: React.FC = () => {
  const { user } = useAuth();
  const [companies, setCompanies] = useState([]);
  const [concessionaires, setConcessionaires] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    concessionaireId: '',
    productId: '',
    companyId: '',
    signatureDate: '',
    contractualDeadline: '',
    deliveryDeadline: '',
    status: 'nao-iniciado',
    observations: '',
    responsibleId: user?.id || '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [compData, concesData, prodData] = await Promise.all([
          companyService.getAll(),
          concessionaireService.getAll(),
          productService.getAll()
        ]);
        setCompanies(compData);
        setConcessionaires(concesData);
        setProducts(prodData);
      } catch (err) {
        setError('Erro ao carregar dados');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await projectService.create(formData);
      setSuccess('Projeto cadastrado com sucesso!');
      // Reset form (keeping responsibleId)
      setFormData(prev => ({
        ...prev,
        concessionaireId: '',
        productId: '',
        companyId: '',
        signatureDate: '',
        contractualDeadline: '',
        deliveryDeadline: '',
        status: 'nao-iniciado',
        observations: '',
        responsibleId: user?.id || '',
      }));
    } catch (err) {
      setError('Erro ao cadastrar projeto');
      console.error(err);
    }
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
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Cadastrar Novo Projeto</h1>
      
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded mb-6">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Concessionária
            </label>
            <select
              value={formData.concessionaireId}
              onChange={(e) => setFormData({ ...formData, concessionaireId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-900"
              required
            >
              <option value="">Selecione uma concessionária</option>
              {concessionaires.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Produto
            </label>
            <select
              value={formData.productId}
              onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-900"
              required
            >
              <option value="">Selecione um produto</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Empresa Responsável
            </label>
            <select
              value={formData.companyId}
              onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-900"
              required
            >
              <option value="">Selecione uma empresa</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data de Assinatura
            </label>
            <input
              type="date"
              value={formData.signatureDate}
              onChange={(e) => setFormData({ ...formData, signatureDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-900"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prazo Contratual
            </label>
            <input
              type="date"
              value={formData.contractualDeadline}
              onChange={(e) => setFormData({ ...formData, contractualDeadline: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-900"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data de Entrega
            </label>
            <input
              type="date"
              value={formData.deliveryDeadline}
              onChange={(e) => setFormData({ ...formData, deliveryDeadline: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-900"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-900"
            >
              <option value="nao-iniciado">Não Iniciado</option>
              <option value="em-andamento">Em Andamento</option>
              <option value="em-analise">Em Análise</option>
              <option value="em-correcao">Em Correção</option>
              <option value="aguardando-aprovacao">Aguardando Aprovação</option>
              <option value="aprovado">Aprovado</option>
              <option value="entregue">Entregue</option>
              <option value="atrasado">Atrasado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
          
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Observações
            </label>
            <textarea
              value={formData.observations}
              onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-900"
              rows="4"
            />
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="btn-primary px-6 py-2"
          >
            Cadastrar Projeto
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectRegisterPage;