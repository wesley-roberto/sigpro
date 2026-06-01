const { authenticateToken } = require('../middleware/auth');

// Mock data
const mockProducts = [
  {
    id: '1',
    name: 'Relatório de Planejamento',
    description: 'P1 - Relatório de Planejamento',
    type: 'unique',
    deadline: 90,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Relatório de Metodologia / Manual VI',
    description: 'P2 - Relatório de Metodologia / Manual VI',
    type: 'unique',
    deadline: 90,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Relatório Mensal de Levantamento / Consolidação de Dados',
    description: 'P3 - Relatório Mensal de Levantamento / Consolidação de Dados',
    type: 'monthly',
    deadline: 30,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    name: 'Relatório Anual de Avaliação de Parâmetros',
    description: 'P4 - Relatório Anual de Avaliação de Parâmetros',
    type: 'annual',
    deadline: 365,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
    name: 'Relatório Trimestral de Avaliação de Obras',
    description: 'P5 - Relatório Trimestral de Avaliação de Obras',
    type: 'quarterly',
    deadline: 90,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '6',
    name: 'Relatório Mensal Técnico de Deslocamentos',
    description: 'P6 - Relatório Mensal Técnico de Deslocamentos',
    type: 'monthly',
    deadline: 30,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

exports.getAll = (req, res) => {
  res.json({
    success: true,
    data: mockProducts
  });
};