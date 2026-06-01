import React, { useState } from 'react';
import RegisterForm from '../components/RegisterForm';

const ConcessionaireRegisterPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Cadastrar Nova Concessionária</h1>
      <div className="max-w-md">
        <RegisterForm type="concessionaire" />
      </div>
    </div>
  );
};

export default ConcessionaireRegisterPage;