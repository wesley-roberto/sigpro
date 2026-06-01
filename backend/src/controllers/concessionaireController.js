const { authenticateToken } = require('../middleware/auth');
const googleSheetsService = require('../services/googleSheetsService');

exports.getAll = (req, res) => {
  // In a real implementation, we would fetch from Google Sheets
  // For now, we'll return mock data to maintain functionality
  const mockConcessionaires = [
    {
      id: '1',
      name: 'Motiva Pantanal',
      signatureDate: '2025-12-31',
      description: 'Concessionária de rodovia Pantanal',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'ECO101 Capixaba',
      signatureDate: '2025-12-31',
      description: 'Concessionária ECO101 Capixaba',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      name: 'Autopista Fluminense',
      signatureDate: '2026-02-27',
      description: 'Concessionária Autopista Fluminense',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  res.json({
    success: true,
    data: mockConcessionaires
  });
};

exports.create = (req, res) => {
  const { name, signatureDate, description } = req.body;
  
  if (!name || !signatureDate) {
    return res.status(400).json({
      success: false,
      error: 'Name and signature date are required'
    });
  }

  // In a real implementation, we would append to Google Sheets
  const newConcessionaire = {
    id: Date.now().toString(),
    name,
    signatureDate,
    description,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  // Mock saving to Google Sheets
  // googleSheetsService.appendSheet('CONCESSIONARIAS!A:D', [[newConcessionaire.name, newConcessionaire.signatureDate, newConcessionaire.description]]);

  res.status(201).json({
    success: true,
    data: newConcessionaire
  });
};