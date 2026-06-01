const { authenticateToken, JWT_SECRET } = require('../middleware/auth');

// Mock data - In production, this would come from a database
const mockUsers = [
  {
    id: '1',
    name: 'Administrador',
    email: 'admin@sigpro.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    role: 'admin',
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
  res.json({
    success: true,
    data: req.user
  });
};