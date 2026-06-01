const { authenticateToken } = require('../middleware/auth');

exports.getDashboard = (req, res) => {
  // Mock dashboard data
  const dashboardData = {
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
      { name: 'P1 - Relatório de Planejamento', count: 3 },
      { name: 'P2 - Relatório de Metodologia', count: 3 },
      { name: 'P3 - Relatório Mensal', count: 5 },
      { name: 'P4 - Relatório Anual', count: 2 },
      { name: 'P5 - Relatório Trimestral', count: 4 },
      { name: 'P6 - Relatório Mensal Técnico', count: 8 }
    ],
    projectsByStatus: [
      { status: 'nao-iniciado', count: 5 },
      { status: 'em-andamento', count: 7 },
      { status: 'em-analise', count: 5 },
      { status: 'em-correcao', count: 3 },
      { status: 'aguardando-aprovacao', count: 2 },
      { status: 'aprovado', count: 1 },
      { status: 'entregue', count: 8 },
      { status: 'atrasado', count: 2 },
      { status: 'cancelado', count: 0 }
    ],
    deliveredVsDelayed: {
      delivered: 8,
      delayed: 2
    },
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

  res.json({
    success: true,
    data: dashboardData
  });
};