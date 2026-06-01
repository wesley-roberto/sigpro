import React from 'react';
import RegisterForm from '../components/RegisterForm';

const CompanyRegisterPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Cadastrar Nova Empresa</h1>
      <p className="text-sm text-gray-500">
        Cadastre as empresas analistas (HOUER, SOLUÇÕES INFRA, INFRA S.A.)
      </p>
      <div className="max-w-md">
        <RegisterForm type="company" />
      </div>
    </div>
  );
};

export default CompanyRegisterPage;