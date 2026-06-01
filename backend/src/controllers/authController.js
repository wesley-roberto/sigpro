const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/auth');

// Mock data - In production, this would come from a database
const mockUsers = [
  {
    id: '1',
    name: 'Administrador',
    email: 'admin@sigpro.com',
    password: 'admin123',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Gestor',
    email: 'gestor@sigpro.com',
    password: 'gestor123',
    role: 'manager',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      error: 'Email and password are required' 
    });
  }

  const user = mockUsers.find(u => u.email === email);
  
  if (!user || user.password !== password) {
    return res.status(401).json({ 
      success: false, 
      error: 'Invalid credentials' 
    });
  }

  const token = generateToken(user);
  
  res.json({
    success: true,
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    }
  });
};

exports.getCurrentUser = (req, res) => {
  // Lookup the full user from our mock database
  const user = mockUsers.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }

  res.json({
    success: true,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
};