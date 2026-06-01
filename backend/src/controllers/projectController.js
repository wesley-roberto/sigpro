const { authenticateToken } = require('../middleware/auth');
const googleSheetsService = require('../services/googleSheetsService');

exports.getAll = (req, res) => {
  // In a real implementation, we would fetch from Google Sheets
  // For now, we'll return mock data to maintain functionality
  const mockProjects = [
    {
      id: '1',
      concessionaireId: '1',
      productId: '1',
      companyId: '1',
      signatureDate: '2025-12-31',
      contractualDeadline: '2026-03-31',
      deliveryDeadline: '2026-03-31',
      status: 'nao-iniciado',
      observations: 'Proj inicial',
      responsibleId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  res.json({
    success: true,
    data: mockProjects
  });
};

exports.create = (req, res) => {
  const { concessionaireId, productId, companyId, signatureDate, contractualDeadline, deliveryDeadline, status, observations, responsibleId } = req.body;
  
  if (!concessionaireId || !productId || !companyId || !signatureDate || !contractualDeadline || !deliveryDeadline || !status || !responsibleId) {
    return res.status(400).json({
      success: false,
      error: 'All fields are required'
    });
  }

  // In a real implementation, we would append to Google Sheets
  const newProject = {
    id: Date.now().toString(),
    concessionaireId,
    productId,
    companyId,
    signatureDate,
    contractualDeadline,
    deliveryDeadline,
    status,
    observations,
    responsibleId,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  // Mock saving to Google Sheets
  // googleSheetsService.appendSheet('PROJETOS!A:K', [[
  //   newProject.id,
  //   newProject.concessionaireId,
  //   newProject.productId,
  //   newProject.companyId,
  //   newProject.signatureDate,
  //   newProject.contractualDeadline,
  //   newProject.deliveryDeadline,
  //   newProject.status,
  //   newProject.observations,
  //   newProject.responsibleId
  // ]]);

  res.status(201).json({
    success: true,
    data: newProject
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  // In a real implementation, we would find and update in Google Sheets
  // For now, we'll use mock data
  const mockProjects = [
    {
      id: '1',
      concessionaireId: '1',
      productId: '1',
      companyId: '1',
      signatureDate: '2025-12-31',
      contractualDeadline: '2026-03-31',
      deliveryDeadline: '2026-03-31',
      status: 'nao-iniciado',
      observations: 'Proj inicial',
      responsibleId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];
  
  const projectIndex = mockProjects.findIndex(p => p.id === id);
  
  if (projectIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Project not found'
    });
  }

  const updatedProject = {
    ...mockProjects[projectIndex],
    ...updates,
    updatedAt: new Date()
  };

  mockProjects[projectIndex] = updatedProject;
  
  // Mock updating in Google Sheets
  // googleSheetsService.updateSheet('PROJETOS!A:K', updatedData, id);

  res.json({
    success: true,
    data: updatedProject
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  
  // In a real implementation, we would delete from Google Sheets
  // For now, we'll use mock data
  const mockProjects = [
    {
      id: '1',
      concessionaireId: '1',
      productId: '1',
      companyId: '1',
      signatureDate: '2025-12-31',
      contractualDeadline: '2026-03-31',
      deliveryDeadline: '2026-03-31',
      status: 'nao-iniciado',
      observations: 'Proj inicial',
      responsibleId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];
  
  const projectIndex = mockProjects.findIndex(p => p.id === id);
  
  if (projectIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Project not found'
    });
  }

  mockProjects.splice(projectIndex, 1);
  
  // Mock deleting from Google Sheets
  // googleSheetsService.deleteSheetRow('PROJETOS', id);

  res.json({
    success: true,
    message: 'Project deleted successfully'
  });
};