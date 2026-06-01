const { authenticateToken } = require('../middleware/auth');
const googleSheetsService = require('../services/googleSheetsService');

exports.getAll = (req, res) => {
  // In a real implementation, we would fetch from Google Sheets
  // For now, we'll return mock data to maintain functionality
  const mockCompanies = [
    {
      id: '1',
      name: 'HOUER',
      description: 'Empresa especializada em análise de projetos',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'SOLUÇÕES INFRA',
      description: 'Consultoria em infraestrutura',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      name: 'INFRA S.A.',
      description: 'Análise de infraestrutura e obras',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  res.json({
    success: true,
    data: mockCompanies
  });
};

exports.create = (req, res) => {
  const { name, description } = req.body;
  
  if (!name) {
    return res.status(400).json({
      success: false,
      error: 'Company name is required'
    });
  }

  // In a real implementation, we would append to Google Sheets
  const newCompany = {
    id: Date.now().toString(),
    name,
    description,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  // Mock saving to Google Sheets
  // googleSheetsService.appendSheet('EMPRESAS!A:D', [[newCompany.name, newCompany.description]]);

  res.status(201).json({
    success: true,
    data: newCompany
  });
};