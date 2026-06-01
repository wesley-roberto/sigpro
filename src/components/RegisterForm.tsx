import React, { useState } from 'react';
import { companyService, concessionaireService } from '../services/api';

type RegisterFormType = 'company' | 'concessionaire';

interface RegisterFormProps {
  type: RegisterFormType;
}

interface FormState {
  name: string;
  description: string;
  signatureDate: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ type }) => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    description: '',
    signatureDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      setLoading(true);

      if (type === 'company') {
        await companyService.create({
          name: formData.name,
          description: formData.description || undefined,
        });
      } else {
        await concessionaireService.create({
          name: formData.name,
          signatureDate: new Date(formData.signatureDate),
          description: formData.description || undefined,
        });
      }

      setSuccess(`${type === 'company' ? 'Empresa' : 'Concessionária'} cadastrada com sucesso!`);
      setFormData({
        name: '',
        description: '',
        signatureDate: '',
      });
    } catch (err) {
      setError('Erro ao cadastrar');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-900"
          required
          placeholder="Digite o nome"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descrição
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-900"
          rows={3}
          placeholder="Digite a descrição (opcional)"
        />
      </div>
      
      {type === 'concessionaire' && (
        <div>
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
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded">
          {success}
        </div>
      )}
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="btn-success px-6 py-2"
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;