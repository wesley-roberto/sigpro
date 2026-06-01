import React, { useState } from 'react';
import RegisterForm from '../components/RegisterForm';

const CompanyRegisterPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Cadastrar Nova Empresa</h1>
      <div className="max-w-md">
        <RegisterForm type="company" />
      </div>
    </div>
  );
};

export default CompanyRegisterPage;